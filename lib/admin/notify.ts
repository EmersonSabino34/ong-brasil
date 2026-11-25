import { fields, kindInfo, slugOfKind, summary } from "@/lib/admin/labels";
import { emailConfigured, sendEmail, teamEmail } from "@/lib/email";
import { site } from "@/lib/site";
import type { SubmissionKind } from "@/lib/submissions";

/**
 * Avisa a equipe por e-mail quando chega um formulário novo (doação, voluntário, parceria, contato).
 * Só envia se o e-mail estiver configurado (RESEND_API_KEY, EMAIL_FROM e NOTIFY_EMAIL ou ADMIN_EMAIL).
 */
export async function notifyTeam(kind: SubmissionKind, record: Record<string, unknown> & { protocol: string; receivedAt: string }) {
  const to = teamEmail();
  if (!to || !emailConfigured()) return;
  const slug = slugOfKind(kind);
  const full = { ...record, kind, status: "novo" as const, note: "" };
  const lines = fields(full)
    .filter((f) => f.value)
    .map((f) => (f.long ? `\n${f.label}:\n${f.value}\n` : `${f.label}: ${f.value}`));
  const replyTo = typeof record.email === "string" ? record.email : undefined;

  await sendEmail({
    to,
    replyTo,
    subject: `[Site] ${kindInfo[slug].singular} ${record.protocol} – ${summary(full)}`,
    text: [
      `Chegou um novo envio pelo site (${kindInfo[slug].singular.toLowerCase()}).`,
      "",
      `Protocolo: ${record.protocol}`,
      ...lines,
      "",
      `Ver no painel: ${site.url}/admin/${slug}/${record.protocol}`,
      replyTo ? "Responda este e-mail para falar direto com a pessoa." : "",
    ].join("\n"),
  });
}
