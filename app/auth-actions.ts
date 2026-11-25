"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { FieldErrors } from "@/app/actions";
import { isStrongEnough } from "@/lib/auth/constants";
import { clear, hit, isLimited } from "@/lib/auth/rate-limit";
import { endSession, startSession } from "@/lib/auth/session";
import {
  createResetToken,
  createUser,
  EmailTakenError,
  findUserByEmail,
  normalizeEmail,
  recordLogin,
  resetPassword as saveNewPassword,
  verifyPassword,
} from "@/lib/auth/users";
import { auth } from "@/lib/content/auth";
import { sendEmail } from "@/lib/email";
import { forms } from "@/lib/content/forms";
import { EMAIL, getLang, isBot, str, values } from "@/lib/form-data";
import { hasLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export type AuthState = {
  ok: boolean | null;
  message?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
  /** Só em desenvolvimento: link de recuperação (enquanto não há envio de e-mail). */
  devLink?: string;
};

const FIFTEEN_MIN = 15 * 60 * 1000;

/** Para onde ir depois do login: só caminhos internos do site (evita redirecionar para outro domínio). */
function safeNext(raw: string, lang: Locale) {
  const fallback = `/${lang}/minha-conta`;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return fallback;
  const [, locale, page] = raw.split(/[/?#]/);
  if (!hasLocale(locale)) return fallback;
  if (page === "entrar" || page === "cadastro" || page === "esqueci-senha" || page === "redefinir-senha") return fallback;
  return raw;
}

/* ---------------- Criar conta ---------------- */
export async function signUp(_prev: AuthState, data: FormData): Promise<AuthState> {
  const lang = getLang(data);
  const keys = ["name", "email", "phone", "country", "newsletter", "consent"];
  if (isBot(data)) return { ok: false, message: forms.errors.server[lang] };

  const name = str(data, "name", 120);
  const email = normalizeEmail(str(data, "email", 200));
  const password = String(data.get("password") ?? "");
  const confirm = String(data.get("confirm") ?? "");

  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = forms.errors.required[lang];
  if (!email) errors.email = forms.errors.required[lang];
  else if (!EMAIL.test(email)) errors.email = forms.errors.email[lang];
  if (!(str(data, "country") in forms.countries)) errors.country = forms.errors.choose[lang];
  if (!isStrongEnough(password)) errors.password = auth.errors.weakPassword[lang];
  if (!confirm) errors.confirm = forms.errors.required[lang];
  else if (confirm !== password) errors.confirm = auth.errors.mismatch[lang];
  if (data.get("consent") !== "on") errors.consent = forms.errors.consent[lang];
  if (Object.keys(errors).length) return { ok: false, message: forms.errors.form[lang], errors, values: values(data, keys) };

  let user;
  try {
    user = await createUser({
      name,
      email,
      phone: str(data, "phone", 40),
      country: str(data, "country"),
      newsletter: data.get("newsletter") === "on",
      lang,
      password,
    });
  } catch (error) {
    if (error instanceof EmailTakenError)
      return { ok: false, message: auth.errors.emailTaken[lang], errors: { email: auth.errors.emailTaken[lang] }, values: values(data, keys) };
    console.error("[auth] erro ao criar conta", error);
    return { ok: false, message: forms.errors.server[lang], values: values(data, keys) };
  }

  await startSession(user, true);
  const next = safeNext(str(data, "next", 300), lang);
  redirect(next === `/${lang}/minha-conta` ? `${next}?bemvindo=1` : next);
}

/* ---------------- Entrar ---------------- */
export async function signIn(_prev: AuthState, data: FormData): Promise<AuthState> {
  const lang = getLang(data);
  const email = normalizeEmail(str(data, "email", 200));
  const password = String(data.get("password") ?? "");
  const kept = { email, remember: data.get("remember") === "on" ? "on" : "" };
  if (isBot(data)) return { ok: false, message: auth.errors.invalidCredentials[lang], values: kept };

  const errors: FieldErrors = {};
  if (!email) errors.email = forms.errors.required[lang];
  else if (!EMAIL.test(email)) errors.email = forms.errors.email[lang];
  if (!password) errors.password = forms.errors.required[lang];
  if (Object.keys(errors).length) return { ok: false, message: forms.errors.form[lang], errors, values: kept };

  const key = `login:${email}`;
  if (isLimited(key, 5)) return { ok: false, message: auth.errors.tooMany[lang], values: kept };

  const user = await findUserByEmail(email);
  if (!(await verifyPassword(user, password)) || !user) {
    hit(key, FIFTEEN_MIN);
    return { ok: false, message: auth.errors.invalidCredentials[lang], values: kept };
  }

  clear(key);
  await startSession(user, kept.remember === "on");
  await recordLogin(user.id).catch(() => undefined);
  redirect(safeNext(str(data, "next", 300), lang));
}

/* ---------------- Sair ---------------- */
export async function signOut(data: FormData) {
  const lang = getLang(data);
  await endSession();
  redirect(`/${lang}/entrar?saiu=1`);
}

/* ---------------- Recuperar senha ---------------- */

/** Endereço do site para montar o link do e-mail. Em produção usa o domínio oficial (nunca o cabeçalho Host). */
async function siteOrigin() {
  if (process.env.NODE_ENV === "production") return site.url;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function requestPasswordReset(_prev: AuthState, data: FormData): Promise<AuthState> {
  const lang = getLang(data);
  const email = normalizeEmail(str(data, "email", 200));
  if (!email) return { ok: false, message: forms.errors.form[lang], errors: { email: forms.errors.required[lang] } };
  if (!EMAIL.test(email)) return { ok: false, message: forms.errors.form[lang], errors: { email: forms.errors.email[lang] }, values: { email } };

  const done: AuthState = { ok: true, message: auth.forgot.sent[lang] };
  if (isBot(data)) return done;

  // Até 3 pedidos por e-mail a cada 15 minutos. A resposta é sempre a mesma (não revela se a conta existe).
  const key = `reset:${email}`;
  if (isLimited(key, 3)) return done;
  hit(key, FIFTEEN_MIN);

  const user = await findUserByEmail(email);
  if (!user) return done;

  const token = await createResetToken(user.id);
  const link = `${await siteOrigin()}/${lang}/redefinir-senha?token=${token}`;
  await sendEmail({
    to: user.email,
    subject: auth.forgot.emailSubject[lang],
    text: `${auth.forgot.emailBody[lang]}\n\n${link}\n\n${auth.forgot.emailIgnore[lang]}`,
  });

  return process.env.NODE_ENV === "production" ? done : { ...done, devLink: link };
}

export async function resetPassword(_prev: AuthState, data: FormData): Promise<AuthState> {
  const lang = getLang(data);
  const token = str(data, "token", 200);
  const password = String(data.get("password") ?? "");
  const confirm = String(data.get("confirm") ?? "");

  const errors: FieldErrors = {};
  if (!isStrongEnough(password)) errors.password = auth.errors.weakPassword[lang];
  if (!confirm) errors.confirm = forms.errors.required[lang];
  else if (confirm !== password) errors.confirm = auth.errors.mismatch[lang];
  if (Object.keys(errors).length) return { ok: false, message: forms.errors.form[lang], errors };

  const user = await saveNewPassword(token, password);
  if (!user) return { ok: false, message: auth.reset.invalid[lang] };

  clear(`login:${user.email}`);
  await startSession(user, false);
  redirect(`/${lang}/minha-conta?senha=1`);
}
