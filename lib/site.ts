/**
 * Dados institucionais da ONG.
 * ATENÇÃO: troque os valores marcados com "SUBSTITUIR" pelos dados reais antes de publicar.
 */
/**
 * Endereço público do site (links de e-mail, sitemap, compartilhamento).
 * Ordem: SITE_URL (defina quando tiver domínio próprio) > domínio de produção da Vercel > padrão.
 */
function siteUrl() {
  const custom = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (custom) return custom.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://www.infinitaesperanca.org";
}

export const site = {
  name: "Infinita Esperança",
  url: siteUrl(),
  email: "contato@infinitaesperanca.org",
  phones: {
    portugal: { display: "+351 9XX XXX XXX", tel: "+3519XXXXXXXX" }, // SUBSTITUIR
    brasil: { display: "+55 11 XXXX-XXXX", tel: "+5511XXXXXXXX" }, // SUBSTITUIR
  },
  /** WhatsApp oficial de contato (Bélgica). `number`: só dígitos, com DDI, para o link wa.me. */
  whatsapp: { number: "32499245466", display: "+32 499 24 54 66" },
  address: {
    street: "São Paulo – SP, Brasil", // SUBSTITUIR pelo endereço da sede
    mapQuery: "São Paulo, SP, Brasil",
  },
  social: {
    instagram: "https://www.instagram.com/", // SUBSTITUIR
    facebook: "https://www.facebook.com/", // SUBSTITUIR
    youtube: "https://www.youtube.com/", // SUBSTITUIR
  },
  /** ID do vídeo institucional no YouTube (ex.: "dQw4w9WgXcQ"). Vazio = mostra a apresentação em fotos. */
  youtubeVideoId: "",
  donation: {
    pix: {
      key: "contato@infinitaesperanca.org", // SUBSTITUIR pela chave PIX real
      merchantName: "INFINITA ESPERANCA ONG", // máx. 25 caracteres, sem acentos
      merchantCity: "SAO PAULO", // máx. 15 caracteres, sem acentos
    },
    bankBR: {
      bank: "Banco XXX (000)", // SUBSTITUIR
      agency: "0000", // SUBSTITUIR
      account: "00000-0", // SUBSTITUIR
      holder: "Associação Infinita Esperança",
      document: "CNPJ 00.000.000/0001-00", // SUBSTITUIR
    },
    bankEU: {
      iban: "PT50 0000 0000 0000 0000 0000 0", // SUBSTITUIR
      bic: "XXXXPTPL", // SUBSTITUIR
      holder: "Associação Infinita Esperança",
    },
    mbway: "+351 9XX XXX XXX", // SUBSTITUIR
  },
} as const;

/** Telefone ainda com "X" (não preenchido): não aparece no site. */
export function isPlaceholder(value: string) {
  return /x/i.test(value);
}

/** Link do WhatsApp com mensagem inicial opcional. */
export function whatsappLink(text?: string) {
  return `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
