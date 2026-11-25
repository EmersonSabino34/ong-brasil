import path from "node:path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Onde os dados ficam guardados.
 *
 * - Com DATABASE_URL (ou POSTGRES_URL) definida: banco Postgres da Neon (usado na Vercel).
 *   As tabelas são criadas sozinhas no primeiro acesso, não é preciso rodar nada.
 * - Sem ela: arquivos na pasta `.data` (bom para rodar no próprio computador).
 *   A pasta pode ser trocada com DATA_DIR.
 */

export const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), ".data");

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

/** true quando o site está usando o banco de dados (e não a pasta .data). */
export const usingDatabase = DATABASE_URL.length > 0;

type Sql = NeonQueryFunction<false, false>;

let client: Sql | null = null;
let ready: Promise<void> | null = null;

const SCHEMA = [
  `create table if not exists ie_users (
    id text primary key,
    email text not null unique,
    data jsonb not null,
    created_at timestamptz not null default now()
  )`,
  `create table if not exists ie_submissions (
    protocol text primary key,
    kind text not null,
    received_at timestamptz not null,
    user_id text,
    status text not null default 'novo',
    note text not null default '',
    updated_at timestamptz,
    data jsonb not null
  )`,
  `create index if not exists ie_submissions_kind_idx on ie_submissions (kind, received_at desc)`,
  `create index if not exists ie_submissions_user_idx on ie_submissions (user_id)`,
];

async function migrate(sql: Sql) {
  for (const statement of SCHEMA) await sql.query(statement);
}

/** Conexão com o banco (ou null quando o site usa a pasta .data). */
export async function db(): Promise<Sql | null> {
  if (!usingDatabase) return null;
  client ??= neon(DATABASE_URL);
  ready ??= migrate(client).catch((error) => {
    ready = null; // tenta de novo na próxima chamada
    throw error;
  });
  await ready;
  return client;
}

/** Erro de valor repetido numa coluna única (ex.: e-mail já cadastrado). */
export function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "23505";
}
