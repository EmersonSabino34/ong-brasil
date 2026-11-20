import { randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type SubmissionKind = "contato" | "voluntario" | "parceria" | "doacao";

const PREFIX: Record<SubmissionKind, string> = { contato: "CT", voluntario: "VL", parceria: "PC", doacao: "DO" };

/** Gera um protocolo curto e legível, ex.: DO-7K4P2X. */
export function newProtocol(kind: SubmissionKind) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  let code = "";
  for (const b of bytes) code += alphabet[b % alphabet.length];
  return `${PREFIX[kind]}-${code}`;
}

/**
 * Guarda o envio de um formulário.
 *
 * Hoje: grava uma linha JSON em `.data/<tipo>.jsonl` (pasta ignorada pelo git).
 * Em produção (ex.: Vercel, onde o disco é somente leitura), troque este trecho por
 * um envio de e-mail (Resend, SendGrid…) ou por um banco de dados (Supabase, Postgres…).
 */
export async function saveSubmission(kind: SubmissionKind, data: Record<string, unknown>) {
  const record = { kind, receivedAt: new Date().toISOString(), ...data };
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, `${kind}.jsonl`), JSON.stringify(record) + "\n", "utf8");
  } catch (error) {
    // Sem disco gravável: ao menos registra no log do servidor.
    console.info(`[formulário:${kind}]`, JSON.stringify(record), error);
  }
}
