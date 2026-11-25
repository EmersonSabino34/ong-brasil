import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { DATA_DIR } from "@/lib/db";
import { SESSION_COOKIE } from "./constants";

/**
 * Sessão em cookie assinado (HMAC-SHA256), sem dados pessoais: só o id do usuário,
 * a "versão" da senha e a validade. O cookie é httpOnly (o JavaScript da página não lê).
 *
 * Chave de assinatura: variável de ambiente AUTH_SECRET (defina em produção, 32+ caracteres).
 * Sem ela, uma chave aleatória é criada em `.data/.auth-secret`.
 */

type Payload = { uid: string; v: number; exp: number };

const DAY = 60 * 60 * 24;
const REMEMBER_SECONDS = 30 * DAY;
const SHORT_SECONDS = DAY / 2; // sem "manter conectado": 12 horas (ou até fechar o navegador)

let secretPromise: Promise<Buffer> | null = null;

async function loadSecret(): Promise<Buffer> {
  const env = process.env.AUTH_SECRET;
  if (env && env.length >= 32) return Buffer.from(env, "utf8");
  if (env) console.warn("[auth] AUTH_SECRET muito curta (mínimo 32 caracteres). Usando chave local.");

  if (process.env.VERCEL) console.error("[auth] Defina AUTH_SECRET nas variáveis de ambiente da Vercel: sem ela os logins caem a cada novo servidor.");
  const file = path.join(DATA_DIR, ".auth-secret");
  try {
    const saved = (await readFile(file, "utf8")).trim();
    if (saved.length >= 32) return Buffer.from(saved, "utf8");
  } catch {}

  const fresh = randomBytes(48).toString("base64url");
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, fresh, { encoding: "utf8", flag: "wx" });
  } catch {
    // Outro processo criou o arquivo ao mesmo tempo: usa o dele.
    try {
      const saved = (await readFile(file, "utf8")).trim();
      if (saved.length >= 32) return Buffer.from(saved, "utf8");
    } catch {}
    console.warn("[auth] Sem disco gravável e sem AUTH_SECRET: as sessões valem só até o servidor reiniciar.");
  }
  return Buffer.from(fresh, "utf8");
}

function getSecret() {
  secretPromise ??= loadSecret();
  return secretPromise;
}

function sign(body: string, secret: Buffer) {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

/** Assina qualquer dado pequeno (JSON) para guardar num cookie. */
export async function signToken(data: object) {
  const body = Buffer.from(JSON.stringify(data), "utf8").toString("base64url");
  return `${body}.${sign(body, await getSecret())}`;
}

/** Confere a assinatura e a validade (`exp`, em segundos) de um token criado com signToken. */
export async function verifyToken<T extends { exp: number }>(token: string | undefined): Promise<T | null> {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = Buffer.from(sign(body, await getSecret()));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
    if (typeof data.exp !== "number" || data.exp * 1000 < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function encodeSession(payload: Payload) {
  return signToken(payload);
}

export async function decodeSession(token: string | undefined): Promise<Payload | null> {
  const data = await verifyToken<Payload>(token);
  if (!data || typeof data.uid !== "string" || typeof data.v !== "number") return null;
  return data;
}

/** Lê a sessão do cookie da requisição atual. */
export async function readSession() {
  return decodeSession((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Grava o cookie de sessão (usar só em Server Actions). */
export async function startSession(user: { id: string; sessionVersion: number }, remember: boolean) {
  const seconds = remember ? REMEMBER_SECONDS : SHORT_SECONDS;
  const token = await encodeSession({ uid: user.id, v: user.sessionVersion, exp: Math.floor(Date.now() / 1000) + seconds });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Sem maxAge o cookie some ao fechar o navegador.
    ...(remember ? { maxAge: seconds } : {}),
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
