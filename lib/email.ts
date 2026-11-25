import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/db";

/**
 * Envio de e-mails (recuperação de senha e avisos de novos formulários para a equipe).
 *
 * Provedor: Resend (https://resend.com). Para ligar, defina:
 *   RESEND_API_KEY  – chave criada no painel da Resend
 *   EMAIL_FROM      – remetente, ex.: "Infinita Esperança <contato@seudominio.org>"
 *                     (o domínio precisa estar verificado na Resend)
 *   NOTIFY_EMAIL    – quem recebe os avisos de novos formulários (padrão: ADMIN_EMAIL)
 *
 * Sem essas variáveis nada é enviado: a mensagem aparece no terminal/log do servidor
 * e, no computador local, fica gravada em `.data/emails.jsonl`.
 */

type Message = { to: string; subject: string; text: string; replyTo?: string };

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(message: Message): Promise<boolean> {
  if (emailConfigured()) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: [message.to],
          subject: message.subject,
          text: message.text,
          ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        }),
      });
      if (response.ok) return true;
      console.error(`[e-mail] A Resend recusou o envio (${response.status}):`, await response.text());
    } catch (error) {
      console.error("[e-mail] Falha ao falar com a Resend:", error);
    }
    return false;
  }

  console.info(`\n[e-mail não enviado – provedor não configurado] Para: ${message.to}\nAssunto: ${message.subject}\n${message.text}\n`);
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(path.join(DATA_DIR, "emails.jsonl"), JSON.stringify({ ...message, createdAt: new Date().toISOString() }) + "\n", "utf8");
  } catch {}
  return false;
}

/** E-mail que recebe os avisos da equipe. */
export function teamEmail() {
  return (process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "").trim();
}
