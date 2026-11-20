/**
 * Dados institucionais da ONG.
 * ATENÇÃO: troque os valores marcados com "SUBSTITUIR" pelos dados reais antes de publicar.
 */
export const site = {
  name: "Infinita Esperança",
  url: "https://www.infinitaesperanca.org", // SUBSTITUIR pelo domínio real
  email: "contato@infinitaesperanca.org",
  phones: {
    portugal: { display: "+351 9XX XXX XXX", tel: "+3519XXXXXXXX" }, // SUBSTITUIR
    brasil: { display: "+55 11 XXXX-XXXX", tel: "+5511XXXXXXXX" }, // SUBSTITUIR
  },
  whatsapp: "5511XXXXXXXXX", // SUBSTITUIR (somente números, com DDI)
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
