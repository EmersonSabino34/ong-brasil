import type { T } from "@/lib/i18n";

export type Currency = "BRL" | "EUR";
export type Frequency = "unica" | "mensal";
export type Method = "pix" | "transferencia" | "mbway" | "cartao";

export const presets: Record<Currency, number[]> = {
  BRL: [30, 50, 100, 200],
  EUR: [10, 25, 50, 100],
};
export const minAmount: Record<Currency, number> = { BRL: 10, EUR: 5 };
export const methodsByCurrency: Record<Currency, Method[]> = {
  BRL: ["pix", "transferencia", "cartao"],
  EUR: ["mbway", "transferencia", "cartao"],
};

export function formatMoney(value: number, currency: Currency, lang: string) {
  const locale = currency === "BRL" ? "pt-BR" : lang === "pt" ? "pt-PT" : lang === "fr" ? "fr-BE" : "nl-BE";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
}

export const donation = {
  metaTitle: { pt: "Doe Agora", fr: "Faire un don", nl: "Doneer nu" },
  subtitle: {
    pt: "Sua doação mantém nossos projetos ativos e leva alimento, educação e oportunidades a quem mais precisa.",
    fr: "Votre don fait vivre nos projets et apporte nourriture, éducation et opportunités à ceux qui en ont le plus besoin.",
    nl: "Uw gift houdt onze projecten draaiende en brengt voeding, onderwijs en kansen naar wie ze het hardst nodig heeft.",
  },
  steps: [
    { pt: "Valor", fr: "Montant", nl: "Bedrag" },
    { pt: "Seus dados", fr: "Vos coordonnées", nl: "Uw gegevens" },
    { pt: "Pagamento", fr: "Paiement", nl: "Betaling" },
  ] as T[],
  currency: { pt: "Moeda", fr: "Devise", nl: "Munt" },
  currencies: {
    BRL: { pt: "R$ – Brasil", fr: "R$ – Brésil", nl: "R$ – Brazilië" },
    EUR: { pt: "€ – Portugal / Bélgica", fr: "€ – Portugal / Belgique", nl: "€ – Portugal / België" },
  } satisfies Record<Currency, T>,
  frequency: { pt: "Tipo de doação", fr: "Type de don", nl: "Soort gift" },
  frequencies: {
    unica: { pt: "Doação única", fr: "Don ponctuel", nl: "Eenmalige gift" },
    mensal: { pt: "Doação mensal", fr: "Don mensuel", nl: "Maandelijkse gift" },
  } satisfies Record<Frequency, T>,
  perMonth: { pt: "/mês", fr: "/mois", nl: "/maand" },
  amount: { pt: "Valor", fr: "Montant", nl: "Bedrag" },
  otherAmount: { pt: "Outro valor", fr: "Autre montant", nl: "Ander bedrag" },
  impact: [
    { pt: "garante refeições para uma criança por uma semana", fr: "assure les repas d’un enfant pendant une semaine", nl: "zorgt een week lang voor de maaltijden van een kind" },
    { pt: "monta kits de higiene para uma família", fr: "offre des kits d’hygiène à une famille", nl: "levert hygiënepakketten voor een gezin" },
    { pt: "compra material para um mês de oficinas", fr: "finance le matériel d’un mois d’ateliers", nl: "betaalt het materiaal voor een maand workshops" },
    { pt: "garante uma cesta básica por um mês", fr: "assure un colis alimentaire pendant un mois", nl: "zorgt een maand lang voor een voedselpakket" },
  ] as T[],
  destination: { pt: "Destino da doação", fr: "Affectation du don", nl: "Bestemming van de gift" },
  destinationGeneral: { pt: "Onde for mais necessário", fr: "Là où c’est le plus nécessaire", nl: "Waar het het meest nodig is" },
  document: { pt: "CPF / NIF (para recibo)", fr: "N° fiscal (pour l’attestation)", nl: "Fiscaal nummer (voor attest)" },
  anonymous: { pt: "Quero que minha doação seja anônima", fr: "Je souhaite que mon don reste anonyme", nl: "Ik wil anoniem blijven" },
  method: { pt: "Forma de pagamento", fr: "Moyen de paiement", nl: "Betaalmethode" },
  methods: {
    pix: { pt: "PIX", fr: "PIX (Brésil)", nl: "PIX (Brazilië)" },
    transferencia: { pt: "Transferência bancária", fr: "Virement bancaire", nl: "Bankoverschrijving" },
    mbway: { pt: "MB WAY", fr: "MB WAY (Portugal)", nl: "MB WAY (Portugal)" },
    cartao: { pt: "Cartão de crédito", fr: "Carte bancaire", nl: "Bankkaart / kredietkaart" },
  } satisfies Record<Method, T>,
  methodHints: {
    pix: { pt: "Instantâneo, com QR Code", fr: "Instantané, avec QR code", nl: "Direct, met QR-code" },
    transferencia: { pt: "Dados bancários na próxima tela", fr: "Coordonnées bancaires à l’écran suivant", nl: "Bankgegevens op het volgende scherm" },
    mbway: { pt: "Pelo número de telemóvel", fr: "Via le numéro de mobile", nl: "Via het gsm-nummer" },
    cartao: { pt: "Link de pagamento seguro", fr: "Lien de paiement sécurisé", nl: "Veilige betaallink" },
  } satisfies Record<Method, T>,
  next: { pt: "Continuar", fr: "Continuer", nl: "Verder" },
  back: { pt: "Voltar", fr: "Retour", nl: "Terug" },
  confirm: { pt: "Confirmar doação", fr: "Confirmer le don", nl: "Gift bevestigen" },
  processing: { pt: "Processando…", fr: "Traitement…", nl: "Bezig…" },
  summary: { pt: "Resumo", fr: "Récapitulatif", nl: "Overzicht" },
  secure: {
    pt: "Seus dados são usados apenas para registrar a doação e emitir o recibo.",
    fr: "Vos données servent uniquement à enregistrer le don et à émettre l’attestation.",
    nl: "Uw gegevens worden enkel gebruikt om de gift te registreren en een attest op te maken.",
  },
  thanks: { pt: "Obrigado pela sua generosidade!", fr: "Merci pour votre générosité !", nl: "Bedankt voor uw vrijgevigheid!" },
  registered: { pt: "Sua doação foi registrada com o protocolo", fr: "Votre don a été enregistré sous la référence", nl: "Uw gift is geregistreerd met referentie" },
  pixTitle: { pt: "Pague com PIX", fr: "Payer avec PIX", nl: "Betalen met PIX" },
  pixHelp: {
    pt: "Abra o app do seu banco, escolha PIX e leia o QR Code ou cole o código abaixo.",
    fr: "Ouvrez l’application de votre banque brésilienne, choisissez PIX et scannez le QR code ou collez le code ci-dessous.",
    nl: "Open uw Braziliaanse bankapp, kies PIX en scan de QR-code of plak de code hieronder.",
  },
  copy: { pt: "Copiar código", fr: "Copier le code", nl: "Code kopiëren" },
  copied: { pt: "Copiado!", fr: "Copié !", nl: "Gekopieerd!" },
  transferTitle: { pt: "Dados para transferência", fr: "Coordonnées pour le virement", nl: "Gegevens voor de overschrijving" },
  transferHelp: {
    pt: "Informe o protocolo na descrição da transferência.",
    fr: "Indiquez la référence en communication du virement.",
    nl: "Vermeld de referentie in de mededeling van de overschrijving.",
  },
  mbwayTitle: { pt: "Pague com MB WAY", fr: "Payer avec MB WAY", nl: "Betalen met MB WAY" },
  mbwayHelp: {
    pt: "Na app MB WAY, envie o valor para o número abaixo e indique o protocolo na mensagem.",
    fr: "Dans l’app MB WAY, envoyez le montant au numéro ci-dessous en indiquant la référence.",
    nl: "Stuur in de MB WAY-app het bedrag naar het nummer hieronder en vermeld de referentie.",
  },
  cardTitle: { pt: "Pagamento com cartão", fr: "Paiement par carte", nl: "Betalen met kaart" },
  cardHelp: {
    pt: "Registramos sua doação. Nossa equipe enviará um link de pagamento seguro para o seu e-mail em até 1 dia útil.",
    fr: "Votre don est enregistré. Notre équipe vous enverra un lien de paiement sécurisé par e-mail sous 1 jour ouvrable.",
    nl: "Uw gift is geregistreerd. Ons team stuurt u binnen 1 werkdag een veilige betaallink per e-mail.",
  },
  monthlyNote: {
    pt: "Doação mensal: entraremos em contato para confirmar a recorrência. Você pode cancelar quando quiser.",
    fr: "Don mensuel : nous vous contacterons pour confirmer la récurrence. Vous pouvez l’arrêter à tout moment.",
    nl: "Maandelijkse gift: we nemen contact op om de herhaling te bevestigen. U kunt op elk moment stoppen.",
  },
  newDonation: { pt: "Fazer outra doação", fr: "Faire un autre don", nl: "Nog een gift doen" },
  bank: { pt: "Banco", fr: "Banque", nl: "Bank" },
  agency: { pt: "Agência", fr: "Agence", nl: "Agentschap" },
  account: { pt: "Conta", fr: "Compte", nl: "Rekening" },
  holder: { pt: "Titular", fr: "Titulaire", nl: "Begunstigde" },
  whereTitle: { pt: "Para onde vai sua doação", fr: "À quoi sert votre don", nl: "Waar uw gift naartoe gaat" },
  otherWays: { pt: "Outras formas de ajudar", fr: "Autres façons d’aider", nl: "Andere manieren om te helpen" },
};
