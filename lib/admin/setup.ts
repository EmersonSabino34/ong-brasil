import { adminConfig } from "@/lib/admin/auth";
import { db, usingDatabase } from "@/lib/db";
import { emailConfigured, teamEmail } from "@/lib/email";
import { isPlaceholder, site } from "@/lib/site";

/** Lista do que está configurado (ou falta) para o site funcionar na internet. */

export type Check = {
  title: string;
  state: "ok" | "warn" | "missing";
  /** Sem isto o site não funciona direito na Vercel. */
  required: boolean;
  detail: string;
  fix?: string;
};

async function databaseCheck(): Promise<Check> {
  const title = "Banco de dados";
  if (!usingDatabase) {
    return {
      title,
      required: Boolean(process.env.VERCEL),
      state: process.env.VERCEL ? "missing" : "warn",
      detail: "Usando a pasta .data deste computador. Na Vercel os formulários e cadastros NÃO ficam guardados assim.",
      fix: "Na Vercel: Storage → Create Database → Neon (Postgres) → conectar ao projeto. Isso cria a variável DATABASE_URL.",
    };
  }
  try {
    const sql = await db();
    await sql!.query("select 1");
    return { title, required: true, state: "ok", detail: "Conectado ao Postgres (Neon). As tabelas são criadas sozinhas." };
  } catch (error) {
    return {
      title,
      required: true,
      state: "missing",
      detail: `DATABASE_URL está definida, mas a conexão falhou: ${(error as Error).message}`,
      fix: "Confira a DATABASE_URL copiada da Neon (precisa começar com postgresql://).",
    };
  }
}

export async function setupChecks(): Promise<Check[]> {
  const admin = adminConfig();
  const secret = process.env.AUTH_SECRET ?? "";
  const notify = teamEmail();

  const pending: string[] = [];
  if (site.donation.pix.key.endsWith("infinitaesperanca.org")) pending.push("chave PIX");
  if (/X{3}|0000/.test(site.donation.bankBR.bank + site.donation.bankBR.account)) pending.push("conta bancária (Brasil)");
  if (/0000/.test(site.donation.bankEU.iban)) pending.push("IBAN (Europa)");
  if (isPlaceholder(site.donation.mbway)) pending.push("MB WAY");
  if (isPlaceholder(site.phones.portugal.tel)) pending.push("telefone de Portugal");
  if (isPlaceholder(site.phones.brasil.tel)) pending.push("telefone do Brasil");
  if (Object.values(site.social).some((url) => /\.com\/$/.test(url))) pending.push("links das redes sociais");

  return [
    await databaseCheck(),
    {
      title: "Chave das sessões",
      required: true,
      state: secret.length >= 32 ? "ok" : "missing",
      detail:
        secret.length >= 32
          ? "AUTH_SECRET definida."
          : "AUTH_SECRET não definida (ou curta). Na Vercel os logins cairiam sozinhos a cada novo servidor.",
      fix: "Crie uma sequência aleatória de 40+ caracteres e coloque em AUTH_SECRET (veja o README).",
    },
    {
      title: "Login do administrador",
      required: true,
      state: admin.ready ? "ok" : "missing",
      detail: admin.ready ? `Acesso pelo e-mail ${admin.email}.` : "ADMIN_EMAIL e/ou ADMIN_PASSWORD (10+ caracteres) não definidos.",
      fix: "Defina ADMIN_EMAIL (o e-mail da ONG) e ADMIN_PASSWORD (senha forte).",
    },
    {
      title: "Envio de e-mails",
      required: false,
      state: emailConfigured() ? "ok" : "warn",
      detail: emailConfigured()
        ? `Enviando pela Resend como ${process.env.EMAIL_FROM}.`
        : "Desligado: a recuperação de senha e os avisos de novos formulários não chegam por e-mail.",
      fix: "Crie uma conta na Resend, verifique o domínio do e-mail e defina RESEND_API_KEY e EMAIL_FROM.",
    },
    {
      title: "Avisos para a equipe",
      required: false,
      state: notify && emailConfigured() ? "ok" : "warn",
      detail: notify ? `Novos formulários serão avisados em ${notify}.` : "Ninguém definido para receber os avisos.",
      fix: "Defina NOTIFY_EMAIL (ou ADMIN_EMAIL) com o e-mail que deve receber os avisos.",
    },
    {
      title: "Endereço do site",
      required: false,
      state: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL ? "ok" : "warn",
      detail: `Links e e-mails usam ${site.url}.`,
      fix: "Quando tiver domínio próprio, defina SITE_URL (ex.: https://www.infinitaesperanca.org).",
    },
    {
      title: "WhatsApp",
      required: false,
      state: "ok",
      detail: `Botão do site e página de contato abrem conversa com ${site.whatsapp.display}.`,
    },
    {
      title: "Dados da ONG ainda fictícios",
      required: false,
      state: pending.length ? "warn" : "ok",
      detail: pending.length ? `Falta trocar no arquivo lib/site.ts: ${pending.join(", ")}.` : "Todos os dados de contato e pagamento preenchidos.",
      fix: "Envie os dados reais para atualizar o arquivo lib/site.ts.",
    },
  ];
}
