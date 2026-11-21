import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Envio de e-mails do sistema de contas (ex.: link de recuperação de senha).
 *
 * AINDA NÃO HÁ PROVEDOR DE E-MAIL CONFIGURADO. Por enquanto a mensagem é gravada em
 * `.data/emails.jsonl` e mostrada no terminal do servidor. Para enviar de verdade,
 * troque o corpo desta função por um provedor (Resend, SendGrid, Amazon SES…).
 */
export async function sendEmail(message: { to: string; subject: string; text: string }) {
  const record = { ...message, createdAt: new Date().toISOString() };
  console.info(`\n[e-mail] Para: ${message.to}\nAssunto: ${message.subject}\n${message.text}\n`);
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "emails.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {}
}
