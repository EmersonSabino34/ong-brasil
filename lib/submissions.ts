import { randomBytes } from "node:crypto";
import { appendFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR, db } from "@/lib/db";
import { isStatus, type SubmissionStatus } from "@/lib/statuses";

/**
 * Envios dos formulários do site (doações, voluntários, parcerias e mensagens de contato).
 *
 * Banco (Vercel): tabela `ie_submissions`. Local: um arquivo `.data/<tipo>.jsonl` por tipo,
 * mais `.data/status.json` com o andamento que a equipe marca no painel.
 */

export type SubmissionKind = "contato" | "voluntario" | "parceria" | "doacao";
export const submissionKinds: SubmissionKind[] = ["doacao", "voluntario", "parceria", "contato"];

export { isStatus, submissionStatuses, type SubmissionStatus } from "@/lib/statuses";

export type SubmissionRecord = Record<string, unknown> & {
  kind: SubmissionKind;
  receivedAt: string;
  protocol: string;
  userId?: string;
  status: SubmissionStatus;
  note: string;
  updatedAt?: string;
};

const PREFIX: Record<SubmissionKind, string> = { contato: "CT", voluntario: "VL", parceria: "PC", doacao: "DO" };

/** Gera um protocolo curto e legível, ex.: DO-7K4P2X. */
export function newProtocol(kind: SubmissionKind) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  let code = "";
  for (const b of bytes) code += alphabet[b % alphabet.length];
  return `${PREFIX[kind]}-${code}`;
}

/* ---------------- Arquivos locais ---------------- */

type StatusMap = Record<string, { status: SubmissionStatus; note: string; updatedAt: string }>;
const STATUS_FILE = () => path.join(DATA_DIR, "status.json");

async function readStatusMap(): Promise<StatusMap> {
  try {
    return JSON.parse(await readFile(STATUS_FILE(), "utf8")) as StatusMap;
  } catch {
    return {};
  }
}

async function readKindFile(kind: SubmissionKind, statuses: StatusMap): Promise<SubmissionRecord[]> {
  let text = "";
  try {
    text = await readFile(path.join(DATA_DIR, `${kind}.jsonl`), "utf8");
  } catch {
    return [];
  }
  const list: SubmissionRecord[] = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    try {
      const raw = JSON.parse(line) as Record<string, unknown>;
      const protocol = typeof raw.protocol === "string" ? raw.protocol : "";
      const extra = statuses[protocol];
      list.push({ ...raw, kind, protocol, status: extra?.status ?? "novo", note: extra?.note ?? "", updatedAt: extra?.updatedAt } as SubmissionRecord);
    } catch {}
  }
  return list;
}

async function readAllFiles(kinds: SubmissionKind[]) {
  const statuses = await readStatusMap();
  const lists = await Promise.all(kinds.map((k) => readKindFile(k, statuses)));
  return lists.flat().sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

/* ---------------- Banco de dados ---------------- */

type Row = { protocol: string; kind: SubmissionKind; received_at: string | Date; user_id: string | null; status: string; note: string; updated_at: string | Date | null; data: Record<string, unknown> };

const iso = (value: string | Date | null) => (value ? new Date(value).toISOString() : undefined);

function fromRow(row: Row): SubmissionRecord {
  return {
    ...row.data,
    kind: row.kind,
    protocol: row.protocol,
    receivedAt: iso(row.received_at) ?? "",
    userId: row.user_id ?? undefined,
    status: isStatus(row.status) ? row.status : "novo",
    note: row.note ?? "",
    updatedAt: iso(row.updated_at),
  };
}

/* ---------------- Funções usadas pelo site ---------------- */

/** Guarda o envio de um formulário. `data` precisa trazer o `protocol`. */
export async function saveSubmission(kind: SubmissionKind, data: Record<string, unknown> & { protocol: string }) {
  const record: Record<string, unknown> & { kind: SubmissionKind; receivedAt: string; protocol: string } = {
    kind,
    receivedAt: new Date().toISOString(),
    ...data,
  };
  const sql = await db();
  if (sql) {
    await sql.query(
      "insert into ie_submissions (protocol, kind, received_at, user_id, data) values ($1, $2, $3, $4, $5::jsonb)",
      [record.protocol, kind, record.receivedAt, typeof record.userId === "string" ? record.userId : null, JSON.stringify(record)],
    );
    return record;
  }
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(path.join(DATA_DIR, `${kind}.jsonl`), JSON.stringify(record) + "\n", "utf8");
  } catch (error) {
    // Sem disco gravável e sem banco: ao menos registra no log do servidor.
    console.error(`[formulário:${kind}] NÃO FOI GUARDADO (configure DATABASE_URL)`, JSON.stringify(record), error);
  }
  return record;
}

/** Envios de um tipo feitos por um usuário conectado (página "Minha conta"), do mais novo ao mais antigo. */
export async function submissionsByUser(kind: SubmissionKind, userId: string): Promise<SubmissionRecord[]> {
  const sql = await db();
  if (sql) {
    const rows = (await sql.query("select * from ie_submissions where kind = $1 and user_id = $2 order by received_at desc", [kind, userId])) as Row[];
    return rows.map(fromRow);
  }
  return (await readAllFiles([kind])).filter((r) => r.userId === userId);
}

/* ---------------- Funções do painel administrativo ---------------- */

export type SubmissionQuery = { kind: SubmissionKind; status?: SubmissionStatus | ""; q?: string; offset?: number; limit?: number };

/** Lista com filtros (andamento e busca por nome, e-mail, protocolo…) e paginação. */
export async function listSubmissions({ kind, status = "", q = "", offset = 0, limit = 25 }: SubmissionQuery) {
  const term = q.trim().toLowerCase();
  const sql = await db();
  if (sql) {
    const where = "kind = $1 and ($2 = '' or status = $2) and ($3 = '' or lower(data::text) like '%' || $3 || '%')";
    const params = [kind, status, term.replace(/[\\%_]/g, (c) => `\\${c}`)];
    const [rows, count] = await Promise.all([
      sql.query(`select * from ie_submissions where ${where} order by received_at desc limit ${Number(limit)} offset ${Number(offset)}`, params),
      sql.query(`select count(*)::int as total from ie_submissions where ${where}`, params),
    ]);
    return { items: (rows as Row[]).map(fromRow), total: Number(count[0]?.total ?? 0) };
  }
  const all = (await readAllFiles([kind])).filter(
    (r) => (!status || r.status === status) && (!term || JSON.stringify(r).toLowerCase().includes(term)),
  );
  return { items: all.slice(offset, offset + limit), total: all.length };
}

export async function getSubmission(protocol: string): Promise<SubmissionRecord | undefined> {
  const sql = await db();
  if (sql) {
    const rows = (await sql.query("select * from ie_submissions where protocol = $1", [protocol])) as Row[];
    return rows[0] ? fromRow(rows[0]) : undefined;
  }
  return (await readAllFiles(submissionKinds)).find((r) => r.protocol === protocol);
}

/** Todos os envios (para os números do painel e a exportação em planilha). */
export async function allSubmissions(kinds: SubmissionKind[] = submissionKinds): Promise<SubmissionRecord[]> {
  const sql = await db();
  if (sql) {
    const rows = (await sql.query("select * from ie_submissions where kind = any($1) order by received_at desc", [kinds])) as Row[];
    return rows.map(fromRow);
  }
  return readAllFiles(kinds);
}

/** Marca o andamento e a anotação interna de um envio. */
export async function updateSubmission(protocol: string, change: { status: SubmissionStatus; note: string }) {
  const updatedAt = new Date().toISOString();
  const sql = await db();
  if (sql) {
    const rows = await sql.query("update ie_submissions set status = $2, note = $3, updated_at = $4 where protocol = $1 returning protocol", [
      protocol,
      change.status,
      change.note,
      updatedAt,
    ]);
    return rows.length > 0;
  }
  if (!(await getSubmission(protocol))) return false;
  const map = await readStatusMap();
  map[protocol] = { ...change, updatedAt };
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${STATUS_FILE()}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(map, null, 2), "utf8");
  await rename(tmp, STATUS_FILE()).catch(() => writeFile(STATUS_FILE(), JSON.stringify(map, null, 2), "utf8"));
  return true;
}
