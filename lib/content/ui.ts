import type { T } from "@/lib/i18n";

/** Textos curtos reaproveitados em vários lugares do site. */
export const ui = {
  tagline: {
    pt: "Transformando vidas com acolhimento, educação, arte, esporte e cidadania.",
    fr: "Transformer des vies par l’accueil, l’éducation, l’art, le sport et la citoyenneté.",
    nl: "Levens veranderen met opvang, onderwijs, kunst, sport en burgerschap.",
  },
  actingIn: { pt: "Atuação", fr: "Présence", nl: "Actief in" },
  expanding: { pt: "Em Expansão", fr: "En expansion", nl: "In uitbreiding" },
  and: { pt: "e", fr: "et", nl: "en" },
  donate: { pt: "Doe Agora", fr: "Faire un don", nl: "Doneer nu" },
  menu: { pt: "Menu", fr: "Menu", nl: "Menu" },
  openMenu: { pt: "Abrir menu", fr: "Ouvrir le menu", nl: "Menu openen" },
  closeMenu: { pt: "Fechar menu", fr: "Fermer le menu", nl: "Menu sluiten" },
  close: { pt: "Fechar", fr: "Fermer", nl: "Sluiten" },
  language: { pt: "Idioma", fr: "Langue", nl: "Taal" },
  skip: { pt: "Pular para o conteúdo", fr: "Aller au contenu", nl: "Naar de inhoud" },
  home: { pt: "Início", fr: "Accueil", nl: "Home" },
  siteMap: { pt: "Mapa do Site", fr: "Plan du site", nl: "Sitemap" },
  contact: { pt: "Contato", fr: "Contact", nl: "Contact" },
  followUs: { pt: "Siga-nos", fr: "Suivez-nous", nl: "Volg ons" },
  rights: {
    pt: "Infinita Esperança ONG. Todos os direitos reservados.",
    fr: "Infinita Esperança ONG. Tous droits réservés.",
    nl: "Infinita Esperança ONG. Alle rechten voorbehouden.",
  },
  privacy: { pt: "Política de Privacidade", fr: "Politique de confidentialité", nl: "Privacybeleid" },
  learnMore: { pt: "Saiba mais", fr: "En savoir plus", nl: "Meer weten" },
  readMore: { pt: "Ler notícia", fr: "Lire l’article", nl: "Lees meer" },
  seeAll: { pt: "Ver todos", fr: "Voir tout", nl: "Alles bekijken" },
  back: { pt: "Voltar", fr: "Retour", nl: "Terug" },
  partOfMenu: { pt: "Submenu de", fr: "Sous-menu de", nl: "Submenu van" },
  countries: {
    br: { pt: "Brasil", fr: "Brésil", nl: "Brazilië" },
    pt: { pt: "Portugal", fr: "Portugal", nl: "Portugal" },
    be: { pt: "Bélgica", fr: "Belgique", nl: "België" },
  } satisfies Record<string, T>,
  status: {
    ativo: { pt: "Em andamento", fr: "En cours", nl: "Lopend" },
    implantacao: { pt: "Em implantação", fr: "En cours d’implantation", nl: "In opbouw" },
  } satisfies Record<string, T>,
  phonePT: { pt: "(Portugal)", fr: "(Portugal)", nl: "(Portugal)" },
  phoneBR: { pt: "(Brasil)", fr: "(Brésil)", nl: "(Brazilië)" },
};
