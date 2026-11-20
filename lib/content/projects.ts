import type { StaticImageData } from "next/image";
import type { T } from "@/lib/i18n";
import type { IconName } from "@/components/icons";
import { img } from "@/lib/images";

export type Country = "br" | "pt" | "be";

export type Stat = { n: number; prefix?: string; suffix?: string; label: T };

export type Project = {
  slug: string;
  /** slug da área em lib/content/areas.ts (vazio para os projetos de expansão) */
  area?: string;
  icon: IconName;
  country: Country;
  status: "ativo" | "implantacao";
  image: StaticImageData;
  gallery: StaticImageData[];
  title: T;
  summary: T;
  description: T;
  audience: T;
  schedule: T;
  place: T;
  /** Números de impacto – SUBSTITUIR pelos números reais da ONG */
  stats: Stat[];
};

const sede: T = { pt: "Sede – São Paulo (SP)", fr: "Siège – São Paulo (Brésil)", nl: "Hoofdzetel – São Paulo (Brazilië)" };

export const projects: Project[] = [
  {
    slug: "alimentacao-solidaria",
    area: "alimentacao-solidaria",
    icon: "utensils",
    country: "br",
    status: "ativo",
    image: img.alimentacao,
    gallery: [img.voluntariosCaixas, img.alimentos],
    title: { pt: "Alimentação Solidária", fr: "Alimentation solidaire", nl: "Solidaire maaltijden" },
    summary: {
      pt: "Refeições nutritivas e regulares para crianças e famílias.",
      fr: "Des repas nutritifs et réguliers pour les enfants et les familles.",
      nl: "Voedzame en regelmatige maaltijden voor kinderen en gezinnen.",
    },
    description: {
      pt: "Cozinha comunitária que serve refeições de segunda a sexta e distribui cestas básicas mensais às famílias acompanhadas pela ONG.",
      fr: "Une cuisine communautaire qui sert des repas du lundi au vendredi et distribue chaque mois des colis alimentaires aux familles suivies par l’association.",
      nl: "Een gemeenschapskeuken die van maandag tot vrijdag maaltijden serveert en maandelijks voedselpakketten uitdeelt aan de gezinnen die de organisatie begeleidt.",
    },
    audience: { pt: "Crianças, adolescentes e famílias", fr: "Enfants, adolescents et familles", nl: "Kinderen, jongeren en gezinnen" },
    schedule: { pt: "Segunda a sexta, 11h às 14h", fr: "Du lundi au vendredi, de 11h à 14h", nl: "Maandag tot vrijdag, 11u tot 14u" },
    place: sede,
    stats: [
      { n: 1200, prefix: "+", label: { pt: "refeições por mês", fr: "repas par mois", nl: "maaltijden per maand" } },
      { n: 80, label: { pt: "famílias com cesta básica", fr: "familles avec colis", nl: "gezinnen met voedselpakket" } },
    ],
  },
  {
    slug: "roupas-e-doacoes",
    area: "roupas-e-itens-essenciais",
    icon: "shirt",
    country: "br",
    status: "ativo",
    image: img.roupas,
    gallery: [img.roupasArara, img.doacaoMaos],
    title: { pt: "Roupas e Doações", fr: "Vêtements et dons", nl: "Kleding en giften" },
    summary: {
      pt: "Distribuição de roupas, calçados e itens de higiene.",
      fr: "Distribution de vêtements, de chaussures et de produits d’hygiène.",
      nl: "Uitdelen van kleding, schoenen en hygiëneproducten.",
    },
    description: {
      pt: "Loja solidária onde as famílias escolhem roupas, calçados e itens de higiene, com triagem feita por voluntários e campanhas sazonais, como a do agasalho.",
      fr: "Une boutique solidaire où les familles choisissent vêtements, chaussures et produits d’hygiène, avec un tri assuré par des bénévoles et des campagnes saisonnières, comme celle des vêtements d’hiver.",
      nl: "Een solidaire winkel waar gezinnen kleding, schoenen en hygiëneproducten kiezen, gesorteerd door vrijwilligers, met seizoensacties zoals de winterkledingactie.",
    },
    audience: { pt: "Famílias acompanhadas pela ONG", fr: "Familles suivies par l’association", nl: "Gezinnen die we begeleiden" },
    schedule: { pt: "Sábados, 9h às 13h", fr: "Le samedi, de 9h à 13h", nl: "Zaterdag, 9u tot 13u" },
    place: sede,
    stats: [
      { n: 3500, prefix: "+", label: { pt: "peças distribuídas por ano", fr: "articles distribués par an", nl: "stuks uitgedeeld per jaar" } },
      { n: 150, label: { pt: "kits de higiene por mês", fr: "kits d’hygiène par mois", nl: "hygiënepakketten per maand" } },
    ],
  },
  {
    slug: "oficinas-artesanais",
    area: "oficinas-artesanais",
    icon: "palette",
    country: "br",
    status: "ativo",
    image: img.oficinas,
    gallery: [img.meninaPintura, img.pinceisTinta],
    title: { pt: "Oficinas Artesanais", fr: "Ateliers artisanaux", nl: "Ambachtelijke workshops" },
    summary: {
      pt: "Artesanato, criatividade e geração de renda para o futuro.",
      fr: "Artisanat, créativité et revenus pour l’avenir.",
      nl: "Handwerk, creativiteit en inkomen voor de toekomst.",
    },
    description: {
      pt: "Oficinas semanais de pintura, cerâmica e costura para crianças, adolescentes e mães, com venda das peças em bazares solidários.",
      fr: "Des ateliers hebdomadaires de peinture, de céramique et de couture pour les enfants, les adolescents et les mères, avec vente des créations lors de bazars solidaires.",
      nl: "Wekelijkse workshops schilderen, keramiek en naaien voor kinderen, jongeren en moeders, met verkoop van de werken op solidaire bazaars.",
    },
    audience: { pt: "Crianças, adolescentes e mães", fr: "Enfants, adolescents et mères", nl: "Kinderen, jongeren en moeders" },
    schedule: { pt: "Terças e quintas, 14h às 17h", fr: "Mardi et jeudi, de 14h à 17h", nl: "Dinsdag en donderdag, 14u tot 17u" },
    place: sede,
    stats: [
      { n: 60, label: { pt: "participantes por semestre", fr: "participants par semestre", nl: "deelnemers per semester" } },
      { n: 4, label: { pt: "bazares solidários por ano", fr: "bazars solidaires par an", nl: "solidaire bazaars per jaar" } },
    ],
  },
  {
    slug: "futebol-social",
    area: "futebol-social",
    icon: "soccer",
    country: "br",
    status: "ativo",
    image: img.futebol,
    gallery: [img.futebolBola, img.futebolNoite],
    title: { pt: "Projeto Futebol Social", fr: "Projet Football Social", nl: "Project Sociaal Voetbal" },
    summary: {
      pt: "Esporte, disciplina, trabalho em equipe e formação de valores.",
      fr: "Sport, discipline, esprit d’équipe et transmission de valeurs.",
      nl: "Sport, discipline, teamwork en waarden.",
    },
    description: {
      pt: "Escolinha de futebol gratuita no contraturno escolar, que usa o esporte para ensinar disciplina, respeito e trabalho em equipe.",
      fr: "Une école de football gratuite en dehors des heures de classe, qui utilise le sport pour enseigner la discipline, le respect et l’esprit d’équipe.",
      nl: "Een gratis voetbalschool buiten de schooluren, die sport gebruikt om discipline, respect en teamwork aan te leren.",
    },
    audience: { pt: "Crianças e adolescentes de 7 a 16 anos", fr: "Enfants et adolescents de 7 à 16 ans", nl: "Kinderen en jongeren van 7 tot 16 jaar" },
    schedule: { pt: "Segundas, quartas e sextas, 15h às 17h", fr: "Lundi, mercredi et vendredi, de 15h à 17h", nl: "Maandag, woensdag en vrijdag, 15u tot 17u" },
    place: sede,
    stats: [
      { n: 120, label: { pt: "atletas inscritos", fr: "joueurs inscrits", nl: "ingeschreven spelers" } },
      { n: 95, suffix: "%", label: { pt: "de frequência escolar", fr: "d’assiduité scolaire", nl: "schoolaanwezigheid" } },
    ],
  },
  {
    slug: "reforco-escolar",
    area: "educacao-e-cidadania",
    icon: "graduation",
    country: "br",
    status: "ativo",
    image: img.reforcoEscolar,
    gallery: [img.livrosEducacao, img.rodaDeConversa],
    title: { pt: "Reforço Escolar e Leitura", fr: "Soutien scolaire et lecture", nl: "Bijles en lezen" },
    summary: {
      pt: "Apoio às tarefas, clube de leitura e acompanhamento escolar.",
      fr: "Aide aux devoirs, club de lecture et suivi scolaire.",
      nl: "Huiswerkhulp, leesclub en schoolopvolging.",
    },
    description: {
      pt: "Turmas pequenas de reforço em português e matemática, clube de leitura e acompanhamento do boletim escolar em parceria com as escolas do bairro.",
      fr: "Des petits groupes de soutien en langue et en mathématiques, un club de lecture et un suivi des bulletins en partenariat avec les écoles du quartier.",
      nl: "Kleine groepen bijles taal en wiskunde, een leesclub en opvolging van de rapporten, in samenwerking met de buurtscholen.",
    },
    audience: { pt: "Crianças de 6 a 14 anos", fr: "Enfants de 6 à 14 ans", nl: "Kinderen van 6 tot 14 jaar" },
    schedule: { pt: "Segunda a quinta, 8h às 11h e 14h às 17h", fr: "Du lundi au jeudi, 8h–11h et 14h–17h", nl: "Maandag tot donderdag, 8u–11u en 14u–17u" },
    place: sede,
    stats: [
      { n: 90, label: { pt: "alunos acompanhados", fr: "élèves suivis", nl: "begeleide leerlingen" } },
      { n: 500, prefix: "+", label: { pt: "livros no acervo", fr: "livres à la bibliothèque", nl: "boeken in de bibliotheek" } },
    ],
  },
  {
    slug: "rede-de-apoio-familiar",
    area: "apoio-a-familia",
    icon: "family",
    country: "br",
    status: "ativo",
    image: img.irmaosAbraco,
    gallery: [img.criancasGrupo, img.maosUnidas],
    title: { pt: "Rede de Apoio Familiar", fr: "Réseau de soutien familial", nl: "Netwerk voor gezinsondersteuning" },
    summary: {
      pt: "Acolhimento, escuta e encaminhamentos para famílias.",
      fr: "Accueil, écoute et orientation pour les familles.",
      nl: "Opvang, luisteren en doorverwijzing voor gezinnen.",
    },
    description: {
      pt: "Atendimento social às famílias, com plano de cuidado individual, grupos de apoio e encaminhamentos para saúde, assistência social e documentação.",
      fr: "Un accompagnement social des familles, avec un plan individuel, des groupes de soutien et une orientation vers la santé, l’aide sociale et les démarches administratives.",
      nl: "Sociale begeleiding van gezinnen, met een individueel zorgplan, steungroepen en doorverwijzing naar gezondheidszorg, sociale dienstverlening en administratie.",
    },
    audience: { pt: "Famílias em situação de vulnerabilidade", fr: "Familles en situation de vulnérabilité", nl: "Gezinnen in een kwetsbare situatie" },
    schedule: { pt: "Com agendamento, de segunda a sexta", fr: "Sur rendez-vous, du lundi au vendredi", nl: "Op afspraak, van maandag tot vrijdag" },
    place: sede,
    stats: [
      { n: 200, prefix: "+", label: { pt: "famílias acompanhadas", fr: "familles accompagnées", nl: "begeleide gezinnen" } },
      { n: 12, label: { pt: "grupos de apoio por ano", fr: "groupes de soutien par an", nl: "steungroepen per jaar" } },
    ],
  },
  {
    slug: "infinita-esperanca-portugal",
    icon: "globe",
    country: "pt",
    status: "implantacao",
    image: img.maosUnidas,
    gallery: [img.equipeVoluntarios],
    title: { pt: "Infinita Esperança Portugal", fr: "Infinita Esperança Portugal", nl: "Infinita Esperança Portugal" },
    summary: {
      pt: "Em implantação: novos projetos e parcerias.",
      fr: "En cours d’implantation : nouveaux projets et partenariats.",
      nl: "In opbouw: nieuwe projecten en partnerschappen.",
    },
    description: {
      pt: "Estamos estruturando a atuação em Portugal, com foco no acolhimento de famílias imigrantes, apoio escolar e parcerias com associações locais. Procuramos voluntários e parceiros para os primeiros projetos.",
      fr: "Nous structurons notre présence au Portugal, avec un accent sur l’accueil des familles migrantes, le soutien scolaire et les partenariats avec des associations locales. Nous recherchons des bénévoles et des partenaires pour les premiers projets.",
      nl: "We bouwen onze werking in Portugal uit, met de focus op opvang van migrantengezinnen, schoolondersteuning en samenwerking met lokale verenigingen. We zoeken vrijwilligers en partners voor de eerste projecten.",
    },
    audience: { pt: "Famílias imigrantes e comunidades locais", fr: "Familles migrantes et communautés locales", nl: "Migrantengezinnen en lokale gemeenschappen" },
    schedule: { pt: "Previsão de início: 2027", fr: "Démarrage prévu : 2027", nl: "Geplande start: 2027" },
    place: { pt: "Portugal", fr: "Portugal", nl: "Portugal" },
    stats: [],
  },
  {
    slug: "infinita-esperanca-belgica",
    icon: "globe",
    country: "be",
    status: "implantacao",
    image: img.coracaoMaos,
    gallery: [img.parceriaReuniao],
    title: { pt: "Infinita Esperança Bélgica", fr: "Infinita Esperança Belgique", nl: "Infinita Esperança België" },
    summary: {
      pt: "Em implantação: levando a Infinita Esperança para mais pessoas.",
      fr: "En cours d’implantation : Infinita Esperança au service de plus de personnes.",
      nl: "In opbouw: Infinita Esperança voor nog meer mensen.",
    },
    description: {
      pt: "Na Bélgica, estamos formando uma rede de voluntários e parceiros para atividades de apoio escolar, oficinas e acolhimento de famílias, em português, francês e neerlandês.",
      fr: "En Belgique, nous constituons un réseau de bénévoles et de partenaires pour des activités de soutien scolaire, des ateliers et l’accueil de familles, en portugais, en français et en néerlandais.",
      nl: "In België bouwen we een netwerk van vrijwilligers en partners uit voor huiswerkbegeleiding, workshops en de opvang van gezinnen, in het Portugees, Frans en Nederlands.",
    },
    audience: { pt: "Famílias e jovens em situação de vulnerabilidade", fr: "Familles et jeunes en situation de vulnérabilité", nl: "Kwetsbare gezinnen en jongeren" },
    schedule: { pt: "Previsão de início: 2027", fr: "Démarrage prévu : 2027", nl: "Geplande start: 2027" },
    place: { pt: "Bélgica", fr: "Belgique", nl: "België" },
    stats: [],
  },
];

/** Os 4 projetos em destaque na página inicial (iguais ao layout). */
export const featuredProjects = projects.slice(0, 4);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
