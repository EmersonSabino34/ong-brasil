"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, type ReactNode } from "react";
import { requestPasswordReset, resetPassword, signIn, signUp, type AuthState } from "@/app/auth-actions";
import { Checkbox, Consent, FormAlert, HiddenFields, PasswordField, SelectField, SubmitButton, TextField } from "@/components/forms/fields";
import { ArrowLeft, CheckCircle, Info, KeyRound, LogIn, Mail, UserPlus } from "@/components/icons";
import { auth } from "@/lib/content/auth";
import { forms } from "@/lib/content/forms";
import { href, type Locale } from "@/lib/i18n";

const initial: AuthState = { ok: null };

/** Mantém o "?next=" (página para onde voltar depois do login) ao trocar entre Entrar e Criar conta. */
function useNext() {
  const next = useSearchParams().get("next") ?? "";
  return { next, query: next ? `?next=${encodeURIComponent(next)}` : "" };
}

function passwordLabels(lang: Locale) {
  return { show: auth.showPassword[lang], hide: auth.hidePassword[lang] };
}

/** Aviso azul (informação) ou verde (sucesso). */
export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "success" }) {
  const styles = tone === "success" ? "border-leaf-600/25 bg-leaf-50 text-leaf-700" : "border-navy-600/20 bg-navy-50 text-navy-900";
  const Icon = tone === "success" ? CheckCircle : Info;
  return (
    <div role="status" className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-[15px] font-semibold ${styles}`}>
      <Icon size={20} className="mt-0.5 shrink-0" /> <span>{children}</span>
    </div>
  );
}

/** Abas "Entrar | Criar conta" no topo dos dois formulários. */
function AuthTabs({ lang, active }: { lang: Locale; active: "login" | "signup" }) {
  const { query } = useNext();
  const tabs = [
    { key: "login", label: auth.login.title[lang], path: "/entrar", Icon: LogIn },
    { key: "signup", label: auth.signup.title[lang], path: "/cadastro", Icon: UserPlus },
  ] as const;
  return (
    <div className="mb-7 grid grid-cols-2 gap-1 rounded-2xl bg-navy-50 p-1.5 ring-1 ring-navy-900/5">
      {tabs.map(({ key, label, path, Icon }) => {
        const isActive = key === active;
        return (
          <Link
            key={key}
            href={`${href(lang, path)}${query}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[15.5px] font-extrabold transition ${
              isActive ? "bg-white text-navy-900 shadow-[0_4px_12px_-6px_rgb(11_42_74/0.45)]" : "text-navy-900/65 hover:text-navy-900"
            }`}
          >
            <Icon size={18} /> {label}
          </Link>
        );
      })}
    </div>
  );
}

/* ---------------- Entrar ---------------- */
export function LoginForm({ lang }: { lang: Locale }) {
  const [state, action] = useActionState(signIn, initial);
  const params = useSearchParams();
  const { next, query } = useNext();
  const e = state.errors ?? {};
  const v = state.values ?? {};

  return (
    <>
      <AuthTabs lang={lang} active="login" />
      <form action={action} noValidate className="relative space-y-5">
        <HiddenFields lang={lang} />
        <input type="hidden" name="next" value={next} />
        {state.ok === false ? (
          <FormAlert message={state.message} />
        ) : params.get("saiu") ? (
          <Notice>{auth.login.loggedOut[lang]}</Notice>
        ) : null}

        <TextField
          label={forms.email[lang]}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={v.email}
          error={e.email}
        />
        <PasswordField
          label={auth.password[lang]}
          name="password"
          autoComplete="current-password"
          error={e.password}
          labels={passwordLabels(lang)}
          aside={
            <Link href={href(lang, "/esqueci-senha")} className="text-sm font-bold text-navy-700 underline-offset-2 hover:text-gold-700 hover:underline">
              {auth.login.forgot[lang]}
            </Link>
          }
        />
        <Checkbox name="remember" label={auth.login.remember[lang]} defaultChecked={state.values ? v.remember === "on" : true} />
        <SubmitButton pendingLabel={auth.login.pending[lang]} icon={<LogIn size={19} />} className="w-full">
          {auth.login.submit[lang]}
        </SubmitButton>
      </form>

      <p className="mt-7 border-t border-line pt-6 text-center text-[15.5px] text-muted">
        {auth.login.noAccount[lang]}{" "}
        <Link href={`${href(lang, "/cadastro")}${query}`} className="font-extrabold text-navy-700 hover:text-gold-700">
          {auth.signup.title[lang]}
        </Link>
      </p>
    </>
  );
}

/* ---------------- Criar conta ---------------- */
export function SignupForm({ lang }: { lang: Locale }) {
  const [state, action] = useActionState(signUp, initial);
  const { next, query } = useNext();
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const countries = Object.entries(forms.countries).map(([value, label]) => ({ value, label: label[lang] }));

  return (
    <>
      <AuthTabs lang={lang} active="signup" />
      <form action={action} noValidate className="relative space-y-5">
        <HiddenFields lang={lang} />
        <input type="hidden" name="next" value={next} />
        {state.ok === false && <FormAlert message={state.message} />}

        <TextField label={forms.name[lang]} name="name" autoComplete="name" defaultValue={v.name} error={e.name} />
        <TextField
          label={forms.email[lang]}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={v.email}
          error={e.email}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label={forms.phone[lang]}
            name="phone"
            type="tel"
            autoComplete="tel"
            optional={forms.optional[lang]}
            defaultValue={v.phone}
            error={e.phone}
          />
          <SelectField
            label={forms.country[lang]}
            name="country"
            autoComplete="country"
            placeholder={forms.select[lang]}
            options={countries}
            defaultValue={v.country ?? ""}
            error={e.country}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <PasswordField
            label={auth.password[lang]}
            name="password"
            autoComplete="new-password"
            minLength={8}
            error={e.password}
            hint={auth.signup.hint[lang]}
            labels={passwordLabels(lang)}
            strength={{ label: auth.signup.strength[lang], levels: auth.signup.levels.map((l) => l[lang]) }}
          />
          <PasswordField
            label={auth.signup.confirm[lang]}
            name="confirm"
            autoComplete="new-password"
            error={e.confirm}
            labels={passwordLabels(lang)}
          />
        </div>

        <div className="space-y-3.5 rounded-2xl bg-cream p-4 ring-1 ring-black/4">
          <Checkbox name="newsletter" label={auth.signup.newsletter[lang]} defaultChecked={state.values ? v.newsletter === "on" : true} />
          <Consent lang={lang} error={e.consent} text={auth.signup.consent[lang]} defaultChecked={v.consent === "on"} />
        </div>

        <SubmitButton pendingLabel={auth.signup.pending[lang]} icon={<UserPlus size={19} />} className="w-full">
          {auth.signup.submit[lang]}
        </SubmitButton>
      </form>

      <p className="mt-7 border-t border-line pt-6 text-center text-[15.5px] text-muted">
        {auth.signup.haveAccount[lang]}{" "}
        <Link href={`${href(lang, "/entrar")}${query}`} className="font-extrabold text-navy-700 hover:text-gold-700">
          {auth.signIn[lang]}
        </Link>
      </p>
    </>
  );
}

function BackToLogin({ lang }: { lang: Locale }) {
  return (
    <Link href={href(lang, "/entrar")} className="inline-flex items-center gap-2 text-[15.5px] font-extrabold text-navy-700 hover:text-gold-700">
      <ArrowLeft size={18} /> {auth.forgot.back[lang]}
    </Link>
  );
}

/* ---------------- Esqueci minha senha ---------------- */
export function ForgotForm({ lang }: { lang: Locale }) {
  const [state, action] = useActionState(requestPasswordReset, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="space-y-6">
        <div role="status" className="rounded-2xl border border-leaf-600/25 bg-leaf-50 p-6 text-center">
          <Mail size={46} strokeWidth={1.6} className="mx-auto text-leaf-600" />
          <p className="mt-4 text-[17px] font-bold text-navy-900">{state.message}</p>
          <p className="mt-2 text-sm text-muted">{auth.forgot.spam[lang]}</p>
        </div>
        {state.devLink && (
          <div className="rounded-2xl border border-dashed border-gold-600/60 bg-gold-50 p-4 text-sm text-navy-900">
            <p className="font-bold">{auth.forgot.devNote[lang]}</p>
            <a href={state.devLink} className="mt-2 block break-all font-mono text-[13px] text-navy-700 underline">
              {state.devLink}
            </a>
          </div>
        )}
        <BackToLogin lang={lang} />
      </div>
    );
  }

  return (
    <>
      <form action={action} noValidate className="relative space-y-5">
        <HiddenFields lang={lang} />
        {state.ok === false && <FormAlert message={state.message} />}
        <TextField
          label={forms.email[lang]}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={state.values?.email}
          error={e.email}
        />
        <SubmitButton pendingLabel={auth.forgot.pending[lang]} icon={<Mail size={19} />} className="w-full">
          {auth.forgot.submit[lang]}
        </SubmitButton>
      </form>
      <div className="mt-7 border-t border-line pt-6 text-center">
        <BackToLogin lang={lang} />
      </div>
    </>
  );
}

/* ---------------- Nova senha (link do e-mail) ---------------- */
export function ResetForm({ lang, token }: { lang: Locale; token: string }) {
  const [state, action] = useActionState(resetPassword, initial);
  const e = state.errors ?? {};

  return (
    <form action={action} noValidate className="relative space-y-5">
      <HiddenFields lang={lang} />
      <input type="hidden" name="token" value={token} />
      {state.ok === false && <FormAlert message={state.message} />}
      <PasswordField
        label={auth.reset.newPassword[lang]}
        name="password"
        autoComplete="new-password"
        minLength={8}
        error={e.password}
        hint={auth.signup.hint[lang]}
        labels={passwordLabels(lang)}
        strength={{ label: auth.signup.strength[lang], levels: auth.signup.levels.map((l) => l[lang]) }}
      />
      <PasswordField label={auth.signup.confirm[lang]} name="confirm" autoComplete="new-password" error={e.confirm} labels={passwordLabels(lang)} />
      <SubmitButton pendingLabel={auth.reset.pending[lang]} icon={<KeyRound size={19} />} className="w-full">
        {auth.reset.submit[lang]}
      </SubmitButton>
    </form>
  );
}
