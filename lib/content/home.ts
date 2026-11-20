import type { T } from "@/lib/i18n";

export const home = {
  metaTitle: {
    pt: "Infinita Esperança ONG – Porque todo ser humano merece uma nova chance",
    fr: "Infinita Esperança ONG – Parce que chaque être humain mérite une nouvelle chance",
    nl: "Infinita Esperança ONG – Omdat ieder mens een nieuwe kans verdient",
  },
  heroText: {
    pt: "Acolhimento, alimento, educação, arte, esporte e oportunidades para crianças, adolescentes e famílias em situação de vulnerabilidade.",
    fr: "Accueil, alimentation, éducation, art, sport et opportunités pour les enfants, les adolescents et les familles en situation de vulnérabilité.",
    nl: "Opvang, voeding, onderwijs, kunst, sport en kansen voor kinderen, jongeren en gezinnen in een kwetsbare situatie.",
  },
  ctaProjects: { pt: "Conheça nossos projetos", fr: "Découvrez nos projets", nl: "Ontdek onze projecten" },
  ctaVideo: { pt: "Assista ao nosso vídeo", fr: "Regardez notre vidéo", nl: "Bekijk onze video" },
  quote: {
    pt: "Porque todo ser humano merece uma nova chance.",
    fr: "Parce que chaque être humain mérite une nouvelle chance.",
    nl: "Omdat ieder mens een nieuwe kans verdient.",
  },
  projectsTitle: { pt: "Nossos Projetos", fr: "Nos projets", nl: "Onze projecten" },
  seeAllProjects: { pt: "Ver todos os projetos", fr: "Voir tous les projets", nl: "Alle projecten bekijken" },
  presenceTitle: { pt: "Nossa Atuação", fr: "Notre présence", nl: "Waar we actief zijn" },
  presence: {
    br: {
      pt: "Nossa história, onde tudo começou.",
      fr: "Notre histoire, là où tout a commencé.",
      nl: "Ons verhaal, waar alles begon.",
    },
    pt: {
      pt: "Em implantação: novos projetos e parcerias.",
      fr: "En cours d’implantation : nouveaux projets et partenariats.",
      nl: "In opbouw: nieuwe projecten en partnerschappen.",
    },
    be: {
      pt: "Em implantação: levando a Infinita Esperança para mais pessoas.",
      fr: "En cours d’implantation : Infinita Esperança au service de plus de personnes.",
      nl: "In opbouw: Infinita Esperança voor nog meer mensen.",
    },
  } satisfies Record<string, T>,
  strip: [
    {
      icon: "sprout",
      color: "leaf",
      path: "/quem-somos#historia",
      title: { pt: "Nossa História", fr: "Notre histoire", nl: "Ons verhaal" },
      text: {
        pt: "Uma trajetória de amor e serviço que já impactou milhares de vidas.",
        fr: "Un parcours d’amour et de service qui a déjà touché des milliers de vies.",
        nl: "Een weg van liefde en dienstbaarheid die al duizenden levens raakte.",
      },
    },
    {
      icon: "heart",
      color: "navy",
      path: "/doe",
      title: { pt: "Seja um Doador", fr: "Devenez donateur", nl: "Word donateur" },
      text: {
        pt: "Sua contribuição mantém nossos projetos ativos.",
        fr: "Votre contribution fait vivre nos projets.",
        nl: "Uw bijdrage houdt onze projecten draaiende.",
      },
    },
    {
      icon: "users",
      color: "leaf",
      path: "/como-ajudar/voluntario",
      title: { pt: "Seja Voluntário", fr: "Devenez bénévole", nl: "Word vrijwilliger" },
      text: {
        pt: "Doe seu tempo, talento e a sua energia.",
        fr: "Offrez votre temps, votre talent et votre énergie.",
        nl: "Geef uw tijd, talent en energie.",
      },
    },
    {
      icon: "building",
      color: "leaf",
      path: "/como-ajudar/parcerias",
      title: { pt: "Parcerias", fr: "Partenariats", nl: "Partnerschappen" },
      text: {
        pt: "Empresas e instituições que caminham conosco por um mundo mais justo.",
        fr: "Entreprises et institutions qui avancent avec nous vers un monde plus juste.",
        nl: "Bedrijven en organisaties die met ons optrekken naar een rechtvaardigere wereld.",
      },
    },
  ] as const,
  video: {
    title: { pt: "Conheça a Infinita Esperança", fr: "Découvrez Infinita Esperança", nl: "Maak kennis met Infinita Esperança" },
    play: { pt: "Reproduzir", fr: "Lecture", nl: "Afspelen" },
    pause: { pt: "Pausar", fr: "Pause", nl: "Pauzeren" },
    prev: { pt: "Anterior", fr: "Précédent", nl: "Vorige" },
    next: { pt: "Próximo", fr: "Suivant", nl: "Volgende" },
    final: {
      pt: "Juntos, levamos esperança ao Brasil, a Portugal e à Bélgica.",
      fr: "Ensemble, nous portons l’espoir au Brésil, au Portugal et en Belgique.",
      nl: "Samen brengen we hoop naar Brazilië, Portugal en België.",
    },
  },
};
