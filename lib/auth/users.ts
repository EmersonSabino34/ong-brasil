import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR, db, isUniqueViolation } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

/**
 * Cadastro de usuários (apoiadores).
 *
 * Banco (Vercel): tabela `ie_users` (o cadastro fica numa coluna JSON). Local: arquivo
 * `.data/usuarios.json`. O restante do site só usa as funções exportadas aqui.
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

const FILE = path.join(DATA_DIR, "usuarios.json");
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

/* ---------------- Armazenamento ---------------- */

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

// Arquivo local: uma alteração por vez, para dois cadastros simultâneos não se sobrescreverem.
let queue: Promise<unknown> = Promise.resolve();
function withLock<R>(fn: (store: Store) => Promise<R>): Promise<R> {
  const run = queue.then(async () => fn(await load()));
  queue = run.catch(() => undefined);
  return run;
}

/** Busca um usuário pelo primeiro campo que combinar. */
async function findOne(where: "email" | "id" | "reset", value: string): Promise<User | undefined> {
  const sql = await db();
  if (sql) {
    const clause = where === "reset" ? "data->'reset'->>'tokenHash' = $1" : `${where} = $1`;
    const rows = (await sql.query(`select data from ie_users where ${clause} limit 1`, [value])) as { data: User }[];
    return rows[0]?.data;
  }
  const users = (await load()).users;
  return users.find((u) => (where === "reset" ? u.reset?.tokenHash === value : u[where] === value));
}

async function insert(user: User) {
  const sql = await db();
  if (sql) {
    try {
      await sql.query("insert into ie_users (id, email, data, created_at) values ($1, $2, $3::jsonb, $4)", [
        user.id,
        user.email,
        JSON.stringify(user),
        user.createdAt,
      ]);
    } catch (error) {
      if (isUniqueViolation(error)) throw new EmailTakenError();
      throw error;
    }
    return;
  }
  await withLock(async (store) => {
    if (store.users.some((u) => u.email === user.email)) throw new EmailTakenError();
    store.users.push(user);
    await save(store);
  });
}

/** Lê, altera e grava um usuário. `change` devolve false para desistir da alteração. */
async function update(id: string, change: (user: User) => boolean | void): Promise<User | undefined> {
  const sql = await db();
  if (sql) {
    const rows = (await sql.query("select data from ie_users where id = $1", [id])) as { data: User }[];
    const user = rows[0]?.data;
    if (!user || change(user) === false) return undefined;
    await sql.query("update ie_users set data = $2::jsonb where id = $1", [id, JSON.stringify(user)]);
    return user;
  }
  return withLock(async (store) => {
    const user = store.users.find((u) => u.id === id);
    if (!user || change(user) === false) return undefined;
    await save(store);
    return user;
  });
}

/* ---------------- Consultas ---------------- */

export async function findUserByEmail(email: string) {
  return findOne("email", normalizeEmail(email));
}

export async function findUserById(id: string) {
  return findOne("id", id);
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("base64url");
}

const resetValid = (user: User, hash: string) => user.reset?.tokenHash === hash && Date.parse(user.reset.expiresAt) > Date.now();

export async function findUserByResetToken(token: string) {
  if (!token) return undefined;
  const hash = tokenHash(token);
  const user = await findOne("reset", hash);
  return user && resetValid(user, hash) ? user : undefined;
}

/** Todos os apoiadores, do cadastro mais novo ao mais antigo (painel administrativo). */
export async function listUsers(): Promise<User[]> {
  const sql = await db();
  if (sql) {
    const rows = (await sql.query("select data from ie_users order by created_at desc")) as { data: User }[];
    return rows.map((r) => r.data);
  }
  return (await load()).users.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
  const now = new Date().toISOString();
  const user: User = {
    id: randomUUID(),
    name: input.name,
    email: normalizeEmail(input.email),
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
  await insert(user);
  return user;
}

export async function recordLogin(id: string) {
  await update(id, (user) => {
    user.lastLoginAt = new Date().toISOString();
  });
}

/** Cria um link de recuperação (vale 1 hora). Retorna o token em texto; guardado fica só o hash. */
export async function createResetToken(id: string) {
  const token = randomBytes(32).toString("base64url");
  await update(id, (user) => {
    user.reset = { tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + RESET_TTL_MS).toISOString() };
  });
  return token;
}

/** Troca a senha usando o token do link. O token só serve uma vez. */
export async function resetPassword(token: string, password: string) {
  const hash = tokenHash(token);
  const found = await findOne("reset", hash);
  if (!found || !resetValid(found, hash)) return undefined;
  const passwordHash = await hashPassword(password);
  return update(found.id, (user) => {
    if (!resetValid(user, hash)) return false;
    user.passwordHash = passwordHash;
    user.sessionVersion += 1;
    user.reset = undefined;
    user.updatedAt = new Date().toISOString();
  });
}
