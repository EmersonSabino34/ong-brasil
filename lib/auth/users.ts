import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

/**
 * Cadastro de usuários (apoiadores).
 *
 * Hoje: arquivo `.data/usuarios.json` (pasta ignorada pelo git), bom para rodar no próprio servidor.
 * Em hospedagens com disco somente leitura (ex.: Vercel) troque as funções deste arquivo por um
 * banco de dados (Supabase, Postgres…). O restante do site só usa as funções exportadas aqui.
 */

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  newsletter: boolean;
  lang: Locale;
  passwordHash: string;
  /** Aumenta a cada troca de senha: derruba as sessões antigas. */
  sessionVersion: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  reset?: { tokenHash: string; expiresAt: string };
};

type Store = { users: User[] };

const FILE = path.join(process.cwd(), ".data", "usuarios.json");
const RESET_TTL_MS = 60 * 60 * 1000; // 1 hora

export class EmailTakenError extends Error {}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

/* ---------------- Senhas (scrypt) ---------------- */

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

function derive(password: string, salt: Buffer, opts = SCRYPT): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, opts.keylen, { N: opts.N, r: opts.r, p: opts.p }, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

async function checkHash(password: string, stored: string) {
  const [alg, N, r, p, salt, hash] = stored.split("$");
  if (alg !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const key = await derive(password, Buffer.from(salt, "base64url"), {
    N: Number(N),
    r: Number(r),
    p: Number(p),
    keylen: expected.length,
  });
  return key.length === expected.length && timingSafeEqual(key, expected);
}

// Hash "falso" usado quando o e-mail não existe, para a resposta levar o mesmo tempo.
let dummyHash: Promise<string> | null = null;

export async function verifyPassword(user: User | undefined, password: string) {
  if (!user) {
    dummyHash ??= hashPassword(randomUUID());
    await checkHash(password, await dummyHash);
    return false;
  }
  return checkHash(password, user.passwordHash);
}

/* ---------------- Arquivo ---------------- */

async function load(): Promise<Store> {
  try {
    const data = JSON.parse(await readFile(FILE, "utf8")) as Store;
    return Array.isArray(data.users) ? data : { users: [] };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { users: [] };
    throw error;
  }
}

async function save(store: Store) {
  await mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
  try {
    await rename(tmp, FILE);
  } catch {
    // Windows pode bloquear a troca se o arquivo estiver aberto em outro programa.
    await writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
  }
}

// Uma alteração por vez, para dois cadastros simultâneos não se sobrescreverem.
let queue: Promise<unknown> = Promise.resolve();
function withLock<R>(fn: (store: Store) => Promise<R>): Promise<R> {
  const run = queue.then(async () => fn(await load()));
  queue = run.catch(() => undefined);
  return run;
}

/* ---------------- Consultas ---------------- */

export async function findUserByEmail(email: string) {
  const target = normalizeEmail(email);
  return (await load()).users.find((u) => u.email === target);
}

export async function findUserById(id: string) {
  return (await load()).users.find((u) => u.id === id);
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("base64url");
}

export async function findUserByResetToken(token: string) {
  if (!token) return undefined;
  const hash = tokenHash(token);
  const now = Date.now();
  return (await load()).users.find((u) => u.reset?.tokenHash === hash && Date.parse(u.reset.expiresAt) > now);
}

/* ---------------- Alterações ---------------- */

export async function createUser(input: {
  name: string;
  email: string;
  phone: string;
  country: string;
  newsletter: boolean;
  lang: Locale;
  password: string;
}) {
  const passwordHash = await hashPassword(input.password);
  return withLock(async (store) => {
    const email = normalizeEmail(input.email);
    if (store.users.some((u) => u.email === email)) throw new EmailTakenError();
    const now = new Date().toISOString();
    const user: User = {
      id: randomUUID(),
      name: input.name,
      email,
      phone: input.phone,
      country: input.country,
      newsletter: input.newsletter,
      lang: input.lang,
      passwordHash,
      sessionVersion: 1,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    };
    store.users.push(user);
    await save(store);
    return user;
  });
}

export async function recordLogin(id: string) {
  await withLock(async (store) => {
    const user = store.users.find((u) => u.id === id);
    if (!user) return;
    user.lastLoginAt = new Date().toISOString();
    await save(store);
  });
}

/** Cria um link de recuperação (vale 1 hora). Retorna o token em texto; no arquivo fica só o hash. */
export async function createResetToken(id: string) {
  const token = randomBytes(32).toString("base64url");
  await withLock(async (store) => {
    const user = store.users.find((u) => u.id === id);
    if (!user) return;
    user.reset = { tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + RESET_TTL_MS).toISOString() };
    await save(store);
  });
  return token;
}

/** Troca a senha usando o token do link. O token só serve uma vez. */
export async function resetPassword(token: string, password: string) {
  const passwordHash = await hashPassword(password);
  const hash = tokenHash(token);
  return withLock(async (store) => {
    const user = store.users.find((u) => u.reset?.tokenHash === hash && Date.parse(u.reset.expiresAt) > Date.now());
    if (!user) return undefined;
    user.passwordHash = passwordHash;
    user.sessionVersion += 1;
    user.reset = undefined;
    user.updatedAt = new Date().toISOString();
    await save(store);
    return user;
  });
}
