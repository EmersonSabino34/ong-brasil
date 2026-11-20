import type { T } from "@/lib/i18n";
import type { IconName } from "@/components/icons";
import { img } from "@/lib/images";

/** Áreas de atuação ("O Que Fazemos") – as 6 da faixa abaixo do banner. */
export type Area = {
  slug: string;
  icon: IconName;
  image: (typeof img)[keyof typeof img];
  title: T;
  short: T;
  intro: T;
  body: T[];
  actions: T[];
};

export const areas: Area[] = [
  {
    slug: "alimentacao-solidaria",
    icon: "apple",
    image: img.alimentacao,
    title: { pt: "Alimentação Solidária", fr: "Alimentation solidaire", nl: "Solidaire maaltijden" },
    short: {
      pt: "Refeições nutritivas e regulares para crianças e famílias.",
      fr: "Des repas nutritifs et réguliers pour les enfants et les familles.",
      nl: "Voedzame en regelmatige maaltijden voor kinderen en gezinnen.",
    },
    intro: {
      pt: "Ninguém aprende, brinca ou sonha de barriga vazia. Garantimos refeições balanceadas e cestas básicas para quem mais precisa.",
      fr: "Personne n’apprend, ne joue ni ne rêve le ventre vide. Nous assurons des repas équilibrés et des colis alimentaires à ceux qui en ont le plus besoin.",
      nl: "Niemand leert, speelt of droomt met een lege maag. Wij zorgen voor evenwichtige maaltijden en voedselpakketten voor wie het het hardst nodig heeft.",
    },
    body: [
      {
        pt: "Nossa cozinha comunitária prepara refeições diárias, com cardápio acompanhado por nutricionistas voluntários. Além das refeições servidas na sede, distribuímos cestas básicas mensais às famílias cadastradas.",
        fr: "Notre cuisine communautaire prépare des repas chaque jour, avec des menus suivis par des nutritionnistes bénévoles. En plus des repas servis sur place, nous distribuons chaque mois des colis alimentaires aux familles inscrites.",
        nl: "Onze gemeenschapskeuken bereidt dagelijks maaltijden, met menu’s die worden opgevolgd door vrijwillige diëtisten. Naast de maaltijden ter plaatse delen we maandelijks voedselpakketten uit aan ingeschreven gezinnen.",
      },
      {
        pt: "Os alimentos vêm de doações, parcerias com mercados e produtores locais e campanhas de arrecadação. Cada refeição é também um momento de acolhimento e convivência.",
        fr: "Les aliments proviennent de dons, de partenariats avec des commerces et producteurs locaux et de collectes. Chaque repas est aussi un moment d’accueil et de convivialité.",
        nl: "Het voedsel komt van giften, samenwerkingen met lokale winkels en producenten en inzamelacties. Elke maaltijd is ook een moment van warmte en samenzijn.",
      },
    ],
    actions: [
      { pt: "Refeições diárias na sede", fr: "Repas quotidiens sur place", nl: "Dagelijkse maaltijden ter plaatse" },
      { pt: "Cestas básicas mensais", fr: "Colis alimentaires mensuels", nl: "Maandelijkse voedselpakketten" },
      { pt: "Orientação nutricional", fr: "Conseils nutritionnels", nl: "Voedingsadvies" },
      { pt: "Campanhas de arrecadação", fr: "Campagnes de collecte", nl: "Inzamelacties" },
    ],
  },
  {
    slug: "roupas-e-itens-essenciais",
    icon: "shirt",
    image: img.roupas,
    title: { pt: "Roupas e Itens Essenciais", fr: "Vêtements et produits essentiels", nl: "Kleding en basisproducten" },
    short: {
      pt: "Distribuição de roupas, calçados e itens de higiene.",
      fr: "Distribution de vêtements, de chaussures et de produits d’hygiène.",
      nl: "Uitdelen van kleding, schoenen en hygiëneproducten.",
    },
    intro: {
      pt: "Dignidade começa pelo básico: roupa limpa, calçado adequado e itens de higiene pessoal.",
      fr: "La dignité commence par l’essentiel : des vêtements propres, des chaussures adaptées et des produits d’hygiène.",
      nl: "Waardigheid begint bij de basis: schone kleding, goede schoenen en hygiëneproducten.",
    },
    body: [
      {
        pt: "Recebemos, triamos e organizamos doações de roupas e calçados em bom estado. As famílias escolhem as peças em um espaço preparado como uma loja solidária, com respeito e autonomia.",
        fr: "Nous recevons, trions et organisons des dons de vêtements et de chaussures en bon état. Les familles choisissent leurs articles dans un espace aménagé comme une boutique solidaire, dans le respect et l’autonomie.",
        nl: "We ontvangen, sorteren en ordenen giften van kleding en schoenen in goede staat. Gezinnen kiezen zelf hun spullen in een ruimte die is ingericht als solidaire winkel, met respect en autonomie.",
      },
      {
        pt: "Também montamos kits de higiene, enxovais para bebês e kits de inverno, distribuídos conforme a necessidade de cada família acompanhada.",
        fr: "Nous préparons aussi des kits d’hygiène, des trousseaux pour bébés et des kits d’hiver, distribués selon les besoins de chaque famille accompagnée.",
        nl: "We stellen ook hygiënepakketten, babyuitzetten en winterpakketten samen, die we verdelen volgens de noden van elk begeleid gezin.",
      },
    ],
    actions: [
      { pt: "Loja solidária", fr: "Boutique solidaire", nl: "Solidaire winkel" },
      { pt: "Kits de higiene", fr: "Kits d’hygiène", nl: "Hygiënepakketten" },
      { pt: "Enxoval para bebês", fr: "Trousseaux pour bébés", nl: "Babyuitzetten" },
      { pt: "Campanha do agasalho", fr: "Campagne vêtements d’hiver", nl: "Winterkledingactie" },
    ],
  },
  {
    slug: "oficinas-artesanais",
    icon: "palette",
    image: img.oficinas,
    title: { pt: "Oficinas Artesanais", fr: "Ateliers artisanaux", nl: "Ambachtelijke workshops" },
    short: {
      pt: "Artesanato, criatividade e geração de renda para o futuro.",
      fr: "Artisanat, créativité et revenus pour l’avenir.",
      nl: "Handwerk, creativiteit en inkomen voor de toekomst.",
    },
    intro: {
      pt: "A arte desperta talentos, fortalece a autoestima e abre caminhos para a geração de renda.",
      fr: "L’art éveille les talents, renforce l’estime de soi et ouvre des pistes de revenus.",
      nl: "Kunst wekt talent, versterkt het zelfvertrouwen en opent wegen naar inkomen.",
    },
    body: [
      {
        pt: "Crianças e adolescentes participam de oficinas de pintura, cerâmica, costura e reciclagem criativa, conduzidas por educadores e artistas voluntários.",
        fr: "Enfants et adolescents participent à des ateliers de peinture, de céramique, de couture et de recyclage créatif, animés par des éducateurs et des artistes bénévoles.",
        nl: "Kinderen en jongeren nemen deel aan workshops schilderen, keramiek, naaien en creatief hergebruik, begeleid door vrijwillige opvoeders en kunstenaars.",
      },
      {
        pt: "Para mães e responsáveis, as oficinas são também uma porta de entrada para a geração de renda: as peças produzidas são vendidas em feiras e bazares solidários.",
        fr: "Pour les mères et les responsables, les ateliers sont aussi une porte d’entrée vers un revenu : les pièces réalisées sont vendues lors de foires et de bazars solidaires.",
        nl: "Voor moeders en opvoeders zijn de workshops ook een opstap naar inkomen: de gemaakte stukken worden verkocht op markten en solidaire bazaars.",
      },
    ],
    actions: [
      { pt: "Pintura e desenho", fr: "Peinture et dessin", nl: "Schilderen en tekenen" },
      { pt: "Cerâmica e modelagem", fr: "Céramique et modelage", nl: "Keramiek en boetseren" },
      { pt: "Costura e bordado", fr: "Couture et broderie", nl: "Naaien en borduren" },
      { pt: "Feiras e bazares solidários", fr: "Foires et bazars solidaires", nl: "Markten en solidaire bazaars" },
    ],
  },
  {
    slug: "futebol-social",
    icon: "soccer",
    image: img.futebol,
    title: { pt: "Projeto Futebol Social", fr: "Projet Football Social", nl: "Project Sociaal Voetbal" },
    short: {
      pt: "Esporte, disciplina, trabalho em equipe e formação de valores.",
      fr: "Sport, discipline, esprit d’équipe et transmission de valeurs.",
      nl: "Sport, discipline, teamwork en waarden.",
    },
    intro: {
      pt: "No campo, as crianças aprendem muito mais do que futebol: aprendem a respeitar, cooperar e persistir.",
      fr: "Sur le terrain, les enfants apprennent bien plus que le football : le respect, la coopération et la persévérance.",
      nl: "Op het veld leren kinderen veel meer dan voetbal: respect, samenwerken en doorzetten.",
    },
    body: [
      {
        pt: "Os treinos acontecem no contraturno escolar, com professores de educação física e voluntários. A frequência escolar é acompanhada de perto: para jogar, é preciso estudar.",
        fr: "Les entraînements ont lieu en dehors des heures de classe, avec des professeurs d’éducation physique et des bénévoles. L’assiduité scolaire est suivie de près : pour jouer, il faut étudier.",
        nl: "De trainingen vinden plaats buiten de schooluren, met leraren lichamelijke opvoeding en vrijwilligers. De schoolaanwezigheid wordt nauw opgevolgd: wie wil spelen, moet ook studeren.",
      },
      {
        pt: "Além dos treinos, organizamos torneios comunitários, rodas de conversa sobre valores e acompanhamento com as famílias.",
        fr: "En plus des entraînements, nous organisons des tournois de quartier, des cercles de parole sur les valeurs et un suivi avec les familles.",
        nl: "Naast de trainingen organiseren we buurttoernooien, gesprekken over waarden en opvolging samen met de gezinnen.",
      },
    ],
    actions: [
      { pt: "Treinos no contraturno", fr: "Entraînements après l’école", nl: "Trainingen na school" },
      { pt: "Acompanhamento escolar", fr: "Suivi scolaire", nl: "Schoolopvolging" },
      { pt: "Torneios comunitários", fr: "Tournois de quartier", nl: "Buurttoernooien" },
      { pt: "Rodas de conversa sobre valores", fr: "Cercles de parole sur les valeurs", nl: "Gesprekken over waarden" },
    ],
  },
  {
    slug: "educacao-e-cidadania",
    icon: "graduation",
    image: img.reforcoEscolar,
    title: { pt: "Educação e Cidadania", fr: "Éducation et citoyenneté", nl: "Onderwijs en burgerschap" },
    short: {
      pt: "Reforço escolar, leitura e formação para a cidadania.",
      fr: "Soutien scolaire, lecture et formation à la citoyenneté.",
      nl: "Bijles, lezen en vorming tot burgerschap.",
    },
    intro: {
      pt: "Educação é a ferramenta mais poderosa para romper ciclos de pobreza.",
      fr: "L’éducation est l’outil le plus puissant pour briser le cycle de la pauvreté.",
      nl: "Onderwijs is het krachtigste middel om de cirkel van armoede te doorbreken.",
    },
    body: [
      {
        pt: "Oferecemos reforço escolar, clube de leitura e apoio às tarefas de casa, em turmas pequenas e com atenção individual.",
        fr: "Nous proposons du soutien scolaire, un club de lecture et une aide aux devoirs, en petits groupes et avec une attention individuelle.",
        nl: "We bieden bijles, een leesclub en huiswerkbegeleiding, in kleine groepen en met persoonlijke aandacht.",
      },
      {
        pt: "Para jovens e adultos, promovemos rodas de conversa sobre direitos, cursos de informática básica e orientação para o primeiro emprego.",
        fr: "Pour les jeunes et les adultes, nous organisons des échanges sur les droits, des cours d’informatique de base et un accompagnement vers le premier emploi.",
        nl: "Voor jongeren en volwassenen organiseren we gesprekken over rechten, basiscursussen informatica en begeleiding naar een eerste job.",
      },
    ],
    actions: [
      { pt: "Reforço escolar", fr: "Soutien scolaire", nl: "Bijles" },
      { pt: "Clube de leitura", fr: "Club de lecture", nl: "Leesclub" },
      { pt: "Informática básica", fr: "Informatique de base", nl: "Basisinformatica" },
      { pt: "Orientação profissional", fr: "Orientation professionnelle", nl: "Beroepsoriëntatie" },
    ],
  },
  {
    slug: "apoio-a-familia",
    icon: "family",
    image: img.irmaosAbraco,
    title: { pt: "Apoio à Família", fr: "Soutien aux familles", nl: "Steun aan gezinnen" },
    short: {
      pt: "Acolhimento, escuta e orientação para famílias inteiras.",
      fr: "Accueil, écoute et accompagnement pour des familles entières.",
      nl: "Opvang, een luisterend oor en begeleiding voor hele gezinnen.",
    },
    intro: {
      pt: "Quando a família é fortalecida, a criança cresce protegida.",
      fr: "Quand la famille est renforcée, l’enfant grandit protégé.",
      nl: "Als het gezin sterker wordt, groeit het kind beschermd op.",
    },
    body: [
      {
        pt: "Nossa equipe realiza acolhimento social, escuta e acompanhamento de cada família, construindo juntos um plano de cuidado com metas possíveis.",
        fr: "Notre équipe assure l’accueil social, l’écoute et le suivi de chaque famille, en construisant ensemble un plan d’accompagnement avec des objectifs réalistes.",
        nl: "Ons team zorgt voor sociale opvang, een luisterend oor en opvolging van elk gezin, en stelt samen een zorgplan op met haalbare doelen.",
      },
      {
        pt: "Fazemos encaminhamentos para a rede pública de saúde, assistência social e documentação, além de grupos de apoio para mães, pais e cuidadores.",
        fr: "Nous orientons vers les services publics de santé, d’aide sociale et de documentation, et animons des groupes de soutien pour les mères, les pères et les aidants.",
        nl: "We verwijzen door naar openbare gezondheidszorg, sociale dienstverlening en administratieve hulp, en organiseren steungroepen voor moeders, vaders en zorgdragers.",
      },
    ],
    actions: [
      { pt: "Acolhimento e escuta", fr: "Accueil et écoute", nl: "Opvang en luisteren" },
      { pt: "Plano de cuidado familiar", fr: "Plan d’accompagnement familial", nl: "Gezinszorgplan" },
      { pt: "Encaminhamentos à rede pública", fr: "Orientation vers les services publics", nl: "Doorverwijzing naar openbare diensten" },
      { pt: "Grupos de apoio", fr: "Groupes de soutien", nl: "Steungroepen" },
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
