import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, ADMIN_LOGIN_PATH } from "@/lib/auth/constants";
import { signToken, verifyToken } from "@/lib/auth/session";

/**
 * Acesso ao painel administrativo (/admin).
 *
 * O login do administrador NÃO fica no banco: vem das variáveis de ambiente
 *   ADMIN_EMAIL     – e-mail de acesso (ex.: o e-mail oficial da ONG)
 *   ADMIN_PASSWORD  – senha (mínimo 10 caracteres)
 * Para trocar a senha basta mudar a variável (na Vercel: Settings → Environment Variables)
 * e publicar de novo; as sessões abertas com a senha antiga deixam de valer.
 */

const SESSION_HOURS = 8;
export const ADMIN_PASSWORD_MIN = 10;

type AdminToken = { role: "admin"; email: string; fp: string; exp: number };

export function adminConfig() {
  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  return { email, password, ready: email.includes("@") && password.length >= ADMIN_PASSWORD_MIN };
}

const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();

/** "Impressão digital" do login atual: muda quando o e-mail ou a senha mudam. */
function fingerprint(email: string, password: string) {
  return digest(`${email}\n${password}`).toString("base64url").slice(0, 22);
}

/** Compara e-mail e senha em tempo constante. */
export function checkAdminCredentials(email: string, password: string) {
  const config = adminConfig();
  if (!config.ready) return false;
  const sameEmail = timingSafeEqual(digest(email.trim().toLowerCase()), digest(config.email));
  const samePassword = timingSafeEqual(digest(password), digest(config.password));
  return sameEmail && samePassword;
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/admin",
};

export async function startAdminSession() {
  const { email, password } = adminConfig();
  const token = await signToken({
    role: "admin",
    email,
    fp: fingerprint(email, password),
    exp: Math.floor(Date.now() / 1000) + SESSION_HOURS * 3600,
  } satisfies AdminToken);
  (await cookies()).set(ADMIN_COOKIE, token, { ...cookieOptions, maxAge: SESSION_HOURS * 3600 });
}

export async function endAdminSession() {
  (await cookies()).set(ADMIN_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

/** E-mail do administrador conectado, ou null. */
export async function getAdmin(): Promise<{ email: string } | null> {
  const data = await verifyToken<AdminToken>((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!data || data.role !== "admin") return null;
  const config = adminConfig();
  if (!config.ready || data.email !== config.email || data.fp !== fingerprint(config.email, config.password)) return null;
  return { email: data.email };
}

/** Use no topo de cada página e ação do painel: sem login válido, vai para a tela de entrada. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect(ADMIN_LOGIN_PATH);
  return admin;
}
