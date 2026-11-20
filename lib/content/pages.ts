import type { T } from "@/lib/i18n";
import type { IconName } from "@/components/icons";

/** Textos das páginas internas. SUBSTITUIR números e datas pelos dados reais da ONG. */

export const about = {
  title: { pt: "Quem Somos", fr: "Qui sommes-nous", nl: "Over ons" },
  subtitle: {
    pt: "Uma organização movida por amor, serviço e pela certeza de que todo ser humano merece uma nova chance.",
    fr: "Une organisation portée par l’amour, le service et la conviction que chaque être humain mérite une nouvelle chance.",
    nl: "Een organisatie gedreven door liefde, dienstbaarheid en de overtuiging dat ieder mens een nieuwe kans verdient.",
  },
  historyTitle: { pt: "Nossa História", fr: "Notre histoire", nl: "Ons verhaal" },
  history: [
    {
      pt: "A Infinita Esperança nasceu em São Paulo, do encontro de pessoas que decidiram não ficar indiferentes à realidade de crianças e famílias em situação de vulnerabilidade. O que começou com refeições servidas nas ruas se transformou em uma rede de acolhimento, educação, arte e esporte.",
      fr: "Infinita Esperança est née à São Paulo, de la rencontre de personnes qui ont refusé de rester indifférentes face à la réalité des enfants et des familles en situation de vulnérabilité. Ce qui a commencé par des repas servis dans la rue est devenu un réseau d’accueil, d’éducation, d’art et de sport.",
      nl: "Infinita Esperança ontstond in São Paulo, toen mensen besloten niet onverschillig te blijven voor de situatie van kwetsbare kinderen en gezinnen. Wat begon met maaltijden op straat, groeide uit tot een netwerk van opvang, onderwijs, kunst en sport.",
    },
    {
      pt: "Hoje, nossos projetos acompanham centenas de famílias e já impactaram milhares de vidas. Agora damos um novo passo: levar essa experiência a Portugal e à Bélgica.",
      fr: "Aujourd’hui, nos projets accompagnent des centaines de familles et ont déjà touché des milliers de vies. Nous franchissons maintenant une nouvelle étape : partager cette expérience au Portugal et en Belgique.",
      nl: "Vandaag begeleiden onze projecten honderden gezinnen en raakten ze al duizenden levens. Nu zetten we een nieuwe stap: deze ervaring naar Portugal en België brengen.",
    },
  ] as T[],
  timeline: [
    {
      year: "2015",
      title: { pt: "Tudo começou", fr: "Le commencement", nl: "Het begin" },
      text: {
        pt: "Um grupo de amigos começa a servir refeições a famílias em situação de rua no centro de São Paulo.",
        fr: "Un groupe d’amis commence à servir des repas à des familles sans abri dans le centre de São Paulo.",
        nl: "Een groep vrienden begint maaltijden te serveren aan dakloze gezinnen in het centrum van São Paulo.",
      },
    },
    {
      year: "2017",
      title: { pt: "Nasce a sede", fr: "Naissance du siège", nl: "Een eigen thuis" },
      text: {
        pt: "Inauguramos nosso primeiro espaço, com cozinha comunitária e sala de reforço escolar.",
        fr: "Nous inaugurons notre premier local, avec une cuisine communautaire et une salle de soutien scolaire.",
        nl: "We openen onze eerste ruimte, met een gemeenschapskeuken en een lokaal voor bijles.",
      },
    },
    {
      year: "2019",
      title: { pt: "Esporte e arte", fr: "Sport et art", nl: "Sport en kunst" },
      text: {
        pt: "Começam o Projeto Futebol Social e as Oficinas Artesanais.",
        fr: "Lancement du Projet Football Social et des Ateliers artisanaux.",
        nl: "Start van Project Sociaal Voetbal en de ambachtelijke workshops.",
      },
    },
    {
      year: "2022",
      title: { pt: "Famílias fortalecidas", fr: "Des familles renforcées", nl: "Sterkere gezinnen" },
      text: {
        pt: "Estruturamos a Rede de Apoio Familiar e a loja solidária de roupas.",
        fr: "Création du Réseau de soutien familial et de la boutique solidaire de vêtements.",
        nl: "We starten het netwerk voor gezinsondersteuning en de solidaire kledingwinkel.",
      },
    },
    {
      year: "2026",
      title: { pt: "Além do oceano", fr: "Au-delà de l’océan", nl: "Over de oceaan" },
      text: {
        pt: "Iniciamos a implantação em Portugal e na Bélgica.",
        fr: "Début de l’implantation au Portugal et en Belgique.",
        nl: "Start van de werking in Portugal en België.",
      },
    },
  ],
  numbers: [
    { value: "10+", label: { pt: "anos de história", fr: "ans d’histoire", nl: "jaar geschiedenis" } },
    { value: "2.000+", label: { pt: "vidas impactadas", fr: "vies touchées", nl: "levens geraakt" } },
    { value: "6", label: { pt: "áreas de atuação", fr: "domaines d’action", nl: "actiedomeinen" } },
    { value: "3", label: { pt: "países", fr: "pays", nl: "landen" } },
  ],
  mvvTitle: { pt: "Missão, Visão e Valores", fr: "Mission, vision et valeurs", nl: "Missie, visie en waarden" },
  mission: {
    icon: "target" as IconName,
    title: { pt: "Missão", fr: "Mission", nl: "Missie" },
    text: {
      pt: "Acolher crianças, adolescentes e famílias em situação de vulnerabilidade, oferecendo alimento, educação, arte, esporte e oportunidades para uma vida digna.",
      fr: "Accueillir les enfants, les adolescents et les familles en situation de vulnérabilité, en leur offrant nourriture, éducation, art, sport et opportunités pour une vie digne.",
      nl: "Kwetsbare kinderen, jongeren en gezinnen opvangen met voeding, onderwijs, kunst, sport en kansen op een waardig leven.",
    },
  },
  vision: {
    icon: "eye" as IconName,
    title: { pt: "Visão", fr: "Vision", nl: "Visie" },
    text: {
      pt: "Ser referência em transformação social, levando esperança a cada vez mais pessoas no Brasil e no mundo.",
      fr: "Être une référence en transformation sociale et porter l’espoir à toujours plus de personnes, au Brésil et dans le monde.",
      nl: "Een voorbeeld zijn in sociale verandering en hoop brengen naar steeds meer mensen, in Brazilië en in de wereld.",
    },
  },
  valuesTitle: { pt: "Valores", fr: "Valeurs", nl: "Waarden" },
  values: [
    { pt: "Amor ao próximo", fr: "Amour du prochain", nl: "Naastenliefde" },
    { pt: "Respeito e dignidade", fr: "Respect et dignité", nl: "Respect en waardigheid" },
    { pt: "Transparência", fr: "Transparence", nl: "Transparantie" },
    { pt: "Compromisso", fr: "Engagement", nl: "Engagement" },
    { pt: "Solidariedade", fr: "Solidarité", nl: "Solidariteit" },
    { pt: "Esperança", fr: "Espoir", nl: "Hoop" },
  ] as T[],
  teamTitle: { pt: "Nossa Equipe", fr: "Notre équipe", nl: "Ons team" },
  teamIntro: {
    pt: "Pessoas comprometidas, remuneradas e voluntárias, que fazem a Infinita Esperança acontecer todos os dias.",
    fr: "Des personnes engagées, salariées et bénévoles, qui font vivre Infinita Esperança au quotidien.",
    nl: "Betrokken mensen, betaald en vrijwillig, die Infinita Esperança elke dag waarmaken.",
  },
  team: [
    {
      icon: "shield" as IconName,
      title: { pt: "Diretoria e Conselho", fr: "Direction et conseil", nl: "Bestuur en raad" },
      text: {
        pt: "Define os rumos da organização, zela pela transparência e presta contas à sociedade.",
        fr: "Définit les orientations de l’organisation, veille à la transparence et rend des comptes à la société.",
        nl: "Bepaalt de koers van de organisatie, waakt over transparantie en legt verantwoording af.",
      },
    },
    {
      icon: "target" as IconName,
      title: { pt: "Coordenação de Projetos", fr: "Coordination des projets", nl: "Projectcoördinatie" },
      text: {
        pt: "Planeja as atividades, acompanha resultados e cuida da qualidade de cada projeto.",
        fr: "Planifie les activités, suit les résultats et veille à la qualité de chaque projet.",
        nl: "Plant de activiteiten, volgt de resultaten op en bewaakt de kwaliteit van elk project.",
      },
    },
    {
      icon: "graduation" as IconName,
      title: { pt: "Educadores e Técnicos", fr: "Éducateurs et techniciens", nl: "Opvoeders en begeleiders" },
      text: {
        pt: "Professores, assistentes sociais, psicólogos e instrutores que estão na linha de frente.",
        fr: "Enseignants, assistants sociaux, psychologues et animateurs présents sur le terrain.",
        nl: "Leerkrachten, maatschappelijk werkers, psychologen en trainers op het terrein.",
      },
    },
    {
      icon: "heart" as IconName,
      title: { pt: "Voluntários", fr: "Bénévoles", nl: "Vrijwilligers" },
      text: {
        pt: "O coração da ONG: pessoas que doam tempo e talento em todas as nossas frentes.",
        fr: "Le cœur de l’association : des personnes qui offrent leur temps et leur talent dans tous nos projets.",
        nl: "Het hart van de organisatie: mensen die hun tijd en talent geven in al onze projecten.",
      },
    },
  ],
  whereTitle: { pt: "Onde Atuamos", fr: "Où nous agissons", nl: "Waar we actief zijn" },
  where: {
    br: {
      pt: "Sede em São Paulo, onde tudo começou. Todos os projetos estão em funcionamento.",
      fr: "Siège à São Paulo, là où tout a commencé. Tous les projets y sont actifs.",
      nl: "Hoofdzetel in São Paulo, waar alles begon. Alle projecten zijn er actief.",
    },
    pt: {
      pt: "Em implantação: novos projetos e parcerias com associações locais.",
      fr: "En cours d’implantation : nouveaux projets et partenariats avec des associations locales.",
      nl: "In opbouw: nieuwe projecten en partnerschappen met lokale verenigingen.",
    },
    be: {
      pt: "Em implantação: rede de voluntários e parceiros em formação.",
      fr: "En cours d’implantation : un réseau de bénévoles et de partenaires se met en place.",
      nl: "In opbouw: een netwerk van vrijwilligers en partners wordt uitgebouwd.",
    },
  } satisfies Record<string, T>,
  joinUs: { pt: "Faça parte dessa história", fr: "Faites partie de cette histoire", nl: "Schrijf mee aan dit verhaal" },
};

export const whatWeDo = {
  title: { pt: "O Que Fazemos", fr: "Nos actions", nl: "Wat we doen" },
  subtitle: {
    pt: "Seis frentes de atuação que se complementam para cuidar da criança e de toda a família.",
    fr: "Six domaines d’action complémentaires pour prendre soin de l’enfant et de toute sa famille.",
    nl: "Zes actiedomeinen die elkaar aanvullen om zorg te dragen voor het kind en het hele gezin.",
  },
  howTitle: { pt: "Como atuamos", fr: "Nos actions concrètes", nl: "Wat we concreet doen" },
  related: { pt: "Projetos desta área", fr: "Projets de ce domaine", nl: "Projecten in dit domein" },
  supportArea: { pt: "Apoie esta área", fr: "Soutenir ce domaine", nl: "Steun dit domein" },
  volunteerArea: { pt: "Seja voluntário", fr: "Devenir bénévole", nl: "Vrijwilliger worden" },
  otherAreas: { pt: "Outras áreas", fr: "Autres domaines", nl: "Andere domeinen" },
};

export const projectsPage = {
  title: { pt: "Projetos", fr: "Projets", nl: "Projecten" },
  subtitle: {
    pt: "Conheça os projetos que transformam vidas em São Paulo e os novos passos em Portugal e na Bélgica.",
    fr: "Découvrez les projets qui transforment des vies à São Paulo et nos nouveaux pas au Portugal et en Belgique.",
    nl: "Ontdek de projecten die levens veranderen in São Paulo en onze nieuwe stappen in Portugal en België.",
  },
  all: { pt: "Todos", fr: "Tous", nl: "Alle" },
  filter: { pt: "Filtrar por área", fr: "Filtrer par domaine", nl: "Filteren op domein" },
  brazil: { pt: "Projetos no Brasil", fr: "Projets au Brésil", nl: "Projecten in Brazilië" },
  expansion: { pt: "Expansão: Portugal e Bélgica", fr: "Expansion : Portugal et Belgique", nl: "Uitbreiding: Portugal en België" },
  expansionText: {
    pt: "Estamos chegando à Europa. Quer ajudar a construir esses projetos? Seja voluntário ou parceiro.",
    fr: "Nous arrivons en Europe. Vous souhaitez aider à construire ces projets ? Devenez bénévole ou partenaire.",
    nl: "We komen naar Europa. Wilt u mee bouwen aan deze projecten? Word vrijwilliger of partner.",
  },
  audience: { pt: "Público", fr: "Public", nl: "Doelgroep" },
  schedule: { pt: "Quando", fr: "Quand", nl: "Wanneer" },
  place: { pt: "Onde", fr: "Où", nl: "Waar" },
  impact: { pt: "Impacto", fr: "Impact", nl: "Impact" },
  about: { pt: "Sobre o projeto", fr: "À propos du projet", nl: "Over het project" },
  photos: { pt: "Fotos", fr: "Photos", nl: "Foto’s" },
  support: { pt: "Apoie este projeto", fr: "Soutenir ce projet", nl: "Steun dit project" },
  supportText: {
    pt: "Com a sua ajuda, este projeto alcança mais crianças e famílias.",
    fr: "Avec votre aide, ce projet touche davantage d’enfants et de familles.",
    nl: "Met uw hulp bereikt dit project meer kinderen en gezinnen.",
  },
  others: { pt: "Outros projetos", fr: "Autres projets", nl: "Andere projecten" },
  details: { pt: "Ver projeto", fr: "Voir le projet", nl: "Project bekijken" },
};

export const help = {
  title: { pt: "Como Ajudar", fr: "Comment aider", nl: "Hoe helpen" },
  subtitle: {
    pt: "Existem muitas formas de fazer parte da Infinita Esperança. Escolha a sua.",
    fr: "Il existe de nombreuses façons de rejoindre Infinita Esperança. Choisissez la vôtre.",
    nl: "Er zijn veel manieren om deel uit te maken van Infinita Esperança. Kies de uwe.",
  },
  ways: [
    {
      icon: "heart" as IconName,
      path: "/doe",
      title: { pt: "Doe Agora", fr: "Faire un don", nl: "Doneer nu" },
      text: {
        pt: "Uma doação única, por PIX, transferência, MB WAY ou cartão.",
        fr: "Un don ponctuel, par virement, MB WAY, carte ou PIX.",
        nl: "Een eenmalige gift, via overschrijving, MB WAY, kaart of PIX.",
      },
      cta: { pt: "Doar", fr: "Donner", nl: "Geven" },
    },
    {
      icon: "handHeart" as IconName,
      path: "/doe?tipo=mensal",
      title: { pt: "Seja um Doador Mensal", fr: "Don mensuel", nl: "Maandelijks schenken" },
      text: {
        pt: "Com uma contribuição mensal, garantimos a continuidade dos projetos.",
        fr: "Un don mensuel garantit la continuité de nos projets.",
        nl: "Met een maandelijkse bijdrage verzekert u de continuïteit van de projecten.",
      },
      cta: { pt: "Quero doar todo mês", fr: "Donner chaque mois", nl: "Elke maand geven" },
    },
    {
      icon: "package" as IconName,
      path: "#itens",
      title: { pt: "Doação de Itens", fr: "Don d’objets", nl: "Goederen schenken" },
      text: {
        pt: "Alimentos, roupas, produtos de higiene e material escolar.",
        fr: "Denrées, vêtements, produits d’hygiène et fournitures scolaires.",
        nl: "Voeding, kleding, hygiëneproducten en schoolmateriaal.",
      },
      cta: { pt: "Ver o que precisamos", fr: "Voir nos besoins", nl: "Bekijk wat we nodig hebben" },
    },
    {
      icon: "users" as IconName,
      path: "/como-ajudar/voluntario",
      title: { pt: "Seja Voluntário", fr: "Devenir bénévole", nl: "Vrijwilliger worden" },
      text: {
        pt: "Doe seu tempo, talento e a sua energia, presencialmente ou a distância.",
        fr: "Offrez votre temps, votre talent et votre énergie, sur place ou à distance.",
        nl: "Geef uw tijd, talent en energie, ter plaatse of op afstand.",
      },
      cta: { pt: "Inscrever-me", fr: "M’inscrire", nl: "Inschrijven" },
    },
    {
      icon: "building" as IconName,
      path: "/como-ajudar/parcerias",
      title: { pt: "Parcerias", fr: "Partenariats", nl: "Partnerschappen" },
      text: {
        pt: "Empresas e instituições que caminham conosco por um mundo mais justo.",
        fr: "Entreprises et institutions qui avancent avec nous vers un monde plus juste.",
        nl: "Bedrijven en organisaties die met ons optrekken naar een rechtvaardigere wereld.",
      },
      cta: { pt: "Ser parceiro", fr: "Devenir partenaire", nl: "Partner worden" },
    },
    {
      icon: "megaphone" as IconName,
      path: "#divulgue",
      title: { pt: "Divulgue", fr: "Faites passer le mot", nl: "Vertel het verder" },
      text: {
        pt: "Compartilhe nosso trabalho com amigos, família e nas redes sociais.",
        fr: "Partagez notre action avec vos amis, votre famille et sur les réseaux sociaux.",
        nl: "Deel ons werk met vrienden, familie en op sociale media.",
      },
      cta: { pt: "Compartilhar", fr: "Partager", nl: "Delen" },
    },
  ],
  itemsTitle: { pt: "Doação de Itens", fr: "Don d’objets", nl: "Goederen schenken" },
  itemsIntro: {
    pt: "Estes são os itens que mais precisamos. Tudo deve estar limpo e em bom estado de conservação.",
    fr: "Voici les objets dont nous avons le plus besoin. Tout doit être propre et en bon état.",
    nl: "Dit zijn de spullen die we het meest nodig hebben. Alles moet proper en in goede staat zijn.",
  },
  items: [
    { pt: "Alimentos não perecíveis (arroz, feijão, leite, óleo)", fr: "Denrées non périssables (riz, haricots, lait, huile)", nl: "Houdbare voeding (rijst, bonen, melk, olie)" },
    { pt: "Roupas e calçados infantis", fr: "Vêtements et chaussures pour enfants", nl: "Kinderkleding en -schoenen" },
    { pt: "Produtos de higiene e fraldas", fr: "Produits d’hygiène et couches", nl: "Hygiëneproducten en luiers" },
    { pt: "Material escolar e livros", fr: "Fournitures scolaires et livres", nl: "Schoolmateriaal en boeken" },
    { pt: "Material para as oficinas (tintas, tecidos, linhas)", fr: "Matériel pour les ateliers (peinture, tissus, fils)", nl: "Materiaal voor workshops (verf, stof, garen)" },
    { pt: "Bolas, coletes e chuteiras", fr: "Ballons, chasubles et chaussures de foot", nl: "Ballen, hesjes en voetbalschoenen" },
  ] as T[],
  itemsWhere: { pt: "Onde e quando entregar", fr: "Où et quand déposer", nl: "Waar en wanneer afgeven" },
  itemsWhereText: {
    pt: "Na nossa sede em São Paulo, de segunda a sexta, das 9h às 17h. Para grandes volumes, agende a entrega.",
    fr: "À notre siège de São Paulo, du lundi au vendredi, de 9h à 17h. Pour les grandes quantités, planifiez le dépôt.",
    nl: "In onze hoofdzetel in São Paulo, van maandag tot vrijdag, van 9u tot 17u. Plan grotere hoeveelheden vooraf in.",
  },
  itemsCta: { pt: "Agendar entrega", fr: "Planifier un dépôt", nl: "Afgifte plannen" },
  shareTitle: { pt: "Divulgue a Infinita Esperança", fr: "Faites connaître Infinita Esperança", nl: "Maak Infinita Esperança bekend" },
  shareText: {
    pt: "Cada compartilhamento pode trazer um novo doador, voluntário ou parceiro.",
    fr: "Chaque partage peut amener un nouveau donateur, bénévole ou partenaire.",
    nl: "Elke keer dat u deelt, kan dat een nieuwe donateur, vrijwilliger of partner opleveren.",
  },
  shareMessage: {
    pt: "Conheça a Infinita Esperança ONG: acolhimento, educação, arte e esporte para crianças e famílias.",
    fr: "Découvrez Infinita Esperança : accueil, éducation, art et sport pour les enfants et les familles.",
    nl: "Maak kennis met Infinita Esperança: opvang, onderwijs, kunst en sport voor kinderen en gezinnen.",
  },
};

export const volunteer = {
  title: { pt: "Seja Voluntário", fr: "Devenir bénévole", nl: "Vrijwilliger worden" },
  subtitle: {
    pt: "Doe seu tempo, talento e a sua energia. Toda ajuda faz diferença.",
    fr: "Offrez votre temps, votre talent et votre énergie. Chaque aide compte.",
    nl: "Geef uw tijd, talent en energie. Elke hulp maakt een verschil.",
  },
  stepsTitle: { pt: "Como funciona", fr: "Comment ça marche", nl: "Hoe het werkt" },
  steps: [
    { title: { pt: "Inscrição", fr: "Inscription", nl: "Inschrijving" }, text: { pt: "Preencha o formulário ao lado.", fr: "Remplissez le formulaire.", nl: "Vul het formulier in." } },
    { title: { pt: "Conversa", fr: "Échange", nl: "Gesprek" }, text: { pt: "Entramos em contato para nos conhecermos.", fr: "Nous vous contactons pour faire connaissance.", nl: "We nemen contact op om kennis te maken." } },
    { title: { pt: "Integração", fr: "Intégration", nl: "Introductie" }, text: { pt: "Você conhece a ONG e a área escolhida.", fr: "Vous découvrez l’association et le domaine choisi.", nl: "U leert de organisatie en het gekozen domein kennen." } },
    { title: { pt: "Mãos à obra", fr: "À l’action", nl: "Aan de slag" }, text: { pt: "Comece a transformar vidas!", fr: "Commencez à transformer des vies !", nl: "Begin levens te veranderen!" } },
  ],
  formTitle: { pt: "Ficha de inscrição", fr: "Formulaire d’inscription", nl: "Inschrijvingsformulier" },
  why: {
    pt: "Precisamos de pessoas em São Paulo, em Portugal e na Bélgica, e também de voluntários a distância para comunicação, traduções e campanhas.",
    fr: "Nous recherchons des personnes à São Paulo, au Portugal et en Belgique, ainsi que des bénévoles à distance pour la communication, les traductions et les campagnes.",
    nl: "We zoeken mensen in São Paulo, Portugal en België, en ook vrijwilligers op afstand voor communicatie, vertalingen en acties.",
  },
};

export const partners = {
  title: { pt: "Parcerias", fr: "Partenariats", nl: "Partnerschappen" },
  subtitle: {
    pt: "Empresas e instituições que caminham conosco por um mundo mais justo.",
    fr: "Entreprises et institutions qui avancent avec nous vers un monde plus juste.",
    nl: "Bedrijven en organisaties die met ons optrekken naar een rechtvaardigere wereld.",
  },
  typesTitle: { pt: "Formas de parceria", fr: "Formes de partenariat", nl: "Vormen van partnerschap" },
  types: [
    {
      icon: "target" as IconName,
      title: { pt: "Patrocínio de projetos", fr: "Parrainage de projets", nl: "Projectsponsoring" },
      text: { pt: "Adote um projeto e acompanhe de perto os resultados.", fr: "Adoptez un projet et suivez ses résultats de près.", nl: "Adopteer een project en volg de resultaten van dichtbij." },
    },
    {
      icon: "package" as IconName,
      title: { pt: "Doação de produtos e serviços", fr: "Dons de produits et services", nl: "Producten en diensten schenken" },
      text: { pt: "Alimentos, roupas, equipamentos ou serviços profissionais.", fr: "Denrées, vêtements, équipements ou services professionnels.", nl: "Voeding, kleding, uitrusting of professionele diensten." },
    },
    {
      icon: "users" as IconName,
      title: { pt: "Voluntariado corporativo", fr: "Bénévolat d’entreprise", nl: "Bedrijfsvrijwilligerswerk" },
      text: { pt: "Ações com seus colaboradores que engajam e transformam.", fr: "Des actions avec vos collaborateurs qui mobilisent et transforment.", nl: "Acties met uw medewerkers die verbinden en veranderen." },
    },
    {
      icon: "megaphone" as IconName,
      title: { pt: "Marketing de causa", fr: "Marketing solidaire", nl: "Goededoelenmarketing" },
      text: { pt: "Campanhas em que parte das vendas apoia nossos projetos.", fr: "Des campagnes où une partie des ventes soutient nos projets.", nl: "Acties waarbij een deel van de verkoop onze projecten steunt." },
    },
  ],
  benefitsTitle: { pt: "O que sua empresa recebe", fr: "Ce que reçoit votre entreprise", nl: "Wat uw bedrijf ontvangt" },
  benefits: [
    { pt: "Relatórios de impacto e prestação de contas", fr: "Rapports d’impact et reddition de comptes", nl: "Impactrapporten en verantwoording" },
    { pt: "Visibilidade em nosso site e redes sociais", fr: "Visibilité sur notre site et nos réseaux sociaux", nl: "Zichtbaarheid op onze website en sociale media" },
    { pt: "Engajamento de colaboradores", fr: "Engagement des collaborateurs", nl: "Betrokkenheid van medewerkers" },
    { pt: "Certificado de parceria social", fr: "Certificat de partenariat social", nl: "Certificaat van sociaal partnerschap" },
  ] as T[],
  formTitle: { pt: "Proponha uma parceria", fr: "Proposez un partenariat", nl: "Stel een partnerschap voor" },
};

export const transparency = {
  title: { pt: "Transparência", fr: "Transparence", nl: "Transparantie" },
  subtitle: {
    pt: "Cada real e cada euro doado tem destino certo. Prestamos contas com clareza a quem confia em nós.",
    fr: "Chaque réal et chaque euro donné a une destination précise. Nous rendons des comptes clairement à ceux qui nous font confiance.",
    nl: "Elke geschonken real en euro heeft een duidelijke bestemming. We leggen helder verantwoording af aan wie ons vertrouwt.",
  },
  resourcesTitle: { pt: "Aplicação dos Recursos", fr: "Utilisation des fonds", nl: "Besteding van middelen" },
  resourcesNote: {
    pt: "Distribuição das despesas no último exercício (em % do total).",
    fr: "Répartition des dépenses du dernier exercice (en % du total).",
    nl: "Verdeling van de uitgaven in het laatste boekjaar (in % van het totaal).",
  },
  /** SUBSTITUIR pelos percentuais reais do balanço. Ordem: do maior para o menor. */
  allocation: [
    {
      pct: 78,
      label: { pt: "Projetos sociais", fr: "Projets sociaux", nl: "Sociale projecten" },
      detail: {
        pt: "Alimentação, roupas, oficinas, esporte, educação e apoio às famílias",
        fr: "Alimentation, vêtements, ateliers, sport, éducation et soutien aux familles",
        nl: "Voeding, kleding, workshops, sport, onderwijs en gezinsondersteuning",
      },
    },
    {
      pct: 11,
      label: { pt: "Estrutura e manutenção da sede", fr: "Locaux et entretien", nl: "Gebouw en onderhoud" },
      detail: { pt: "Aluguel, água, energia e manutenção", fr: "Loyer, eau, énergie et entretien", nl: "Huur, water, energie en onderhoud" },
    },
    {
      pct: 7,
      label: { pt: "Captação e comunicação", fr: "Collecte et communication", nl: "Fondsenwerving en communicatie" },
      detail: { pt: "Campanhas, site e materiais de divulgação", fr: "Campagnes, site web et supports", nl: "Acties, website en communicatiemateriaal" },
    },
    {
      pct: 4,
      label: { pt: "Administração", fr: "Administration", nl: "Administratie" },
      detail: { pt: "Contabilidade, auditoria e obrigações legais", fr: "Comptabilité, audit et obligations légales", nl: "Boekhouding, audit en wettelijke verplichtingen" },
    },
  ],
  indicatorsTitle: { pt: "Indicadores", fr: "Indicateurs", nl: "Indicatoren" },
  indicators: [
    { value: "28.000+", label: { pt: "refeições servidas por ano", fr: "repas servis par an", nl: "maaltijden per jaar" } },
    { value: "200+", label: { pt: "famílias acompanhadas", fr: "familles accompagnées", nl: "begeleide gezinnen" } },
    { value: "350+", label: { pt: "crianças e adolescentes atendidos", fr: "enfants et adolescents accompagnés", nl: "kinderen en jongeren begeleid" } },
    { value: "120+", label: { pt: "voluntários ativos", fr: "bénévoles actifs", nl: "actieve vrijwilligers" } },
  ],
  reportsTitle: { pt: "Relatórios Anuais", fr: "Rapports annuels", nl: "Jaarverslagen" },
  reportsIntro: {
    pt: "Relatórios de atividades e demonstrações financeiras, aprovados em assembleia.",
    fr: "Rapports d’activité et états financiers, approuvés en assemblée générale.",
    nl: "Activiteitenverslagen en jaarrekeningen, goedgekeurd door de algemene vergadering.",
  },
  /** Para publicar um PDF, coloque o arquivo em /public/docs e preencha `file` (ex.: "/docs/relatorio-2025.pdf"). */
  reports: [
    { year: "2025", file: "", title: { pt: "Relatório de Atividades 2025", fr: "Rapport d’activité 2025", nl: "Activiteitenverslag 2025" } },
    { year: "2024", file: "", title: { pt: "Relatório de Atividades 2024", fr: "Rapport d’activité 2024", nl: "Activiteitenverslag 2024" } },
    { year: "2023", file: "", title: { pt: "Relatório de Atividades 2023", fr: "Rapport d’activité 2023", nl: "Activiteitenverslag 2023" } },
  ],
  docsTitle: { pt: "Documentos Institucionais", fr: "Documents institutionnels", nl: "Officiële documenten" },
  docs: [
    { file: "", title: { pt: "Estatuto Social", fr: "Statuts", nl: "Statuten" } },
    { file: "", title: { pt: "Ata de eleição da diretoria", fr: "Procès-verbal d’élection du conseil", nl: "Notulen van de bestuursverkiezing" } },
    { file: "", title: { pt: "Cartão CNPJ", fr: "Enregistrement CNPJ (Brésil)", nl: "CNPJ-registratie (Brazilië)" } },
    { file: "", title: { pt: "Certidões negativas de débitos", fr: "Attestations de régularité fiscale", nl: "Attesten van fiscale regelmatigheid" } },
  ],
  download: { pt: "Baixar PDF", fr: "Télécharger le PDF", nl: "PDF downloaden" },
  request: { pt: "Solicitar cópia", fr: "Demander une copie", nl: "Kopie aanvragen" },
  commitTitle: { pt: "Nossos compromissos", fr: "Nos engagements", nl: "Onze engagementen" },
  commitments: [
    { pt: "Contas auditadas anualmente", fr: "Comptes audités chaque année", nl: "Jaarlijks geauditeerde rekeningen" },
    { pt: "Proteção de dados (LGPD e RGPD)", fr: "Protection des données (LGPD et RGPD)", nl: "Gegevensbescherming (LGPD en AVG)" },
    { pt: "Política de proteção à criança", fr: "Politique de protection de l’enfance", nl: "Kinderbeschermingsbeleid" },
    { pt: "Prestação de contas aos doadores", fr: "Redevabilité envers les donateurs", nl: "Verantwoording aan donateurs" },
  ] as T[],
};

export const newsPage = {
  title: { pt: "Notícias", fr: "Actualités", nl: "Nieuws" },
  subtitle: {
    pt: "Acompanhe as novidades, conquistas e campanhas da Infinita Esperança.",
    fr: "Suivez les nouvelles, les réussites et les campagnes d’Infinita Esperança.",
    nl: "Volg het nieuws, de successen en de acties van Infinita Esperança.",
  },
  latest: { pt: "Mais recente", fr: "À la une", nl: "Meest recent" },
  share: { pt: "Compartilhe", fr: "Partager", nl: "Delen" },
  related: { pt: "Leia também", fr: "À lire aussi", nl: "Lees ook" },
  all: { pt: "Todas as notícias", fr: "Toutes les actualités", nl: "Alle nieuws" },
};

export const galleryPage = {
  title: { pt: "Galeria", fr: "Galerie", nl: "Galerij" },
  subtitle: {
    pt: "Momentos que mostram, melhor do que palavras, o que a sua ajuda constrói.",
    fr: "Des moments qui montrent, mieux que des mots, ce que votre aide construit.",
    nl: "Momenten die beter dan woorden tonen wat uw hulp opbouwt.",
  },
  all: { pt: "Todas", fr: "Toutes", nl: "Alle" },
  photos: { pt: "fotos", fr: "photos", nl: "foto’s" },
  open: { pt: "Ampliar foto", fr: "Agrandir la photo", nl: "Foto vergroten" },
};

export const contactPage = {
  title: { pt: "Contato", fr: "Contact", nl: "Contact" },
  subtitle: {
    pt: "Fale com a gente. Respondemos em português, francês e neerlandês.",
    fr: "Écrivez-nous. Nous répondons en portugais, en français et en néerlandais.",
    nl: "Neem contact met ons op. We antwoorden in het Portugees, Frans en Nederlands.",
  },
  formTitle: { pt: "Envie uma mensagem", fr: "Envoyez-nous un message", nl: "Stuur ons een bericht" },
  infoTitle: { pt: "Nossos canais", fr: "Nos coordonnées", nl: "Onze contactgegevens" },
  address: { pt: "Endereço", fr: "Adresse", nl: "Adres" },
  hours: { pt: "Atendimento", fr: "Horaires", nl: "Openingsuren" },
  hoursText: { pt: "Segunda a sexta, 9h às 17h (horário de Brasília)", fr: "Du lundi au vendredi, 9h–17h (heure de Brasília)", nl: "Maandag tot vrijdag, 9u–17u (tijd in Brasília)" },
  whatsapp: { pt: "Falar no WhatsApp", fr: "Écrire sur WhatsApp", nl: "Chatten via WhatsApp" },
  faqTitle: { pt: "Perguntas frequentes", fr: "Questions fréquentes", nl: "Veelgestelde vragen" },
  faq: [
    {
      q: { pt: "Minha doação é segura?", fr: "Mon don est-il sécurisé ?", nl: "Is mijn gift veilig?" },
      a: {
        pt: "Sim. Os dados são usados apenas para registrar a doação e emitir recibo, e prestamos contas anualmente na página de Transparência.",
        fr: "Oui. Les données servent uniquement à enregistrer le don et à émettre l’attestation, et nous rendons des comptes chaque année sur la page Transparence.",
        nl: "Ja. De gegevens worden enkel gebruikt om de gift te registreren en een attest op te maken, en we leggen jaarlijks verantwoording af op de pagina Transparantie.",
      },
    },
    {
      q: { pt: "Posso doar de Portugal ou da Bélgica?", fr: "Puis-je donner depuis le Portugal ou la Belgique ?", nl: "Kan ik geven vanuit Portugal of België?" },
      a: {
        pt: "Sim! Aceitamos doações em euro por transferência SEPA, MB WAY e cartão.",
        fr: "Oui ! Nous acceptons les dons en euros par virement SEPA, MB WAY et carte.",
        nl: "Ja! We aanvaarden giften in euro via SEPA-overschrijving, MB WAY en kaart.",
      },
    },
    {
      q: { pt: "Preciso ter experiência para ser voluntário?", fr: "Faut-il de l’expérience pour être bénévole ?", nl: "Heb ik ervaring nodig om vrijwilliger te worden?" },
      a: {
        pt: "Não. Oferecemos integração e acompanhamento. O mais importante é a vontade de ajudar.",
        fr: "Non. Nous proposons une intégration et un accompagnement. L’essentiel, c’est l’envie d’aider.",
        nl: "Nee. We zorgen voor een introductie en begeleiding. Het belangrijkste is de wil om te helpen.",
      },
    },
    {
      q: { pt: "Como uma família pode ser atendida pela ONG?", fr: "Comment une famille peut-elle être accompagnée ?", nl: "Hoe kan een gezin hulp krijgen?" },
      a: {
        pt: "Basta procurar nossa sede ou enviar uma mensagem com o assunto “Quero ser atendido”. Nossa equipe fará o acolhimento.",
        fr: "Il suffit de venir à notre siège ou d’envoyer un message avec l’objet « Je souhaite être accompagné ». Notre équipe vous accueillera.",
        nl: "Kom langs in onze hoofdzetel of stuur een bericht met het onderwerp “Ik wil hulp”. Ons team helpt u verder.",
      },
    },
  ],
};

export const privacyPage = {
  title: { pt: "Política de Privacidade", fr: "Politique de confidentialité", nl: "Privacybeleid" },
  sections: [
    {
      h: { pt: "Quais dados coletamos", fr: "Données collectées", nl: "Welke gegevens we verzamelen" },
      p: {
        pt: "Coletamos apenas os dados que você informa nos formulários (nome, e-mail, telefone, mensagem e, nas doações, valor e forma de pagamento). Não coletamos dados de cartão neste site.",
        fr: "Nous collectons uniquement les données que vous saisissez dans les formulaires (nom, e-mail, téléphone, message et, pour les dons, montant et moyen de paiement). Aucune donnée de carte n’est collectée sur ce site.",
        nl: "We verzamelen enkel de gegevens die u invult in de formulieren (naam, e-mail, telefoon, bericht en, bij giften, bedrag en betaalmethode). Op deze website worden geen kaartgegevens verzameld.",
      },
    },
    {
      h: { pt: "Para que usamos", fr: "Utilisation", nl: "Waarvoor we ze gebruiken" },
      p: {
        pt: "Para responder ao seu contato, organizar o voluntariado e as parcerias, registrar doações e emitir recibos. Nunca vendemos ou compartilhamos seus dados com terceiros para fins comerciais.",
        fr: "Pour répondre à votre demande, organiser le bénévolat et les partenariats, enregistrer les dons et émettre les attestations. Nous ne vendons ni ne partageons jamais vos données à des fins commerciales.",
        nl: "Om uw vraag te beantwoorden, vrijwilligerswerk en partnerschappen te organiseren, giften te registreren en attesten op te maken. We verkopen of delen uw gegevens nooit voor commerciële doeleinden.",
      },
    },
    {
      h: { pt: "Seus direitos (LGPD e RGPD)", fr: "Vos droits (LGPD et RGPD)", nl: "Uw rechten (LGPD en AVG)" },
      p: {
        pt: "Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail de contato.",
        fr: "Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment via l’adresse e-mail de contact.",
        nl: "U kunt op elk moment inzage, correctie of verwijdering van uw gegevens vragen via het contactadres.",
      },
    },
    {
      h: { pt: "Cookies", fr: "Cookies", nl: "Cookies" },
      p: {
        pt: "Usamos apenas um cookie para lembrar o idioma escolhido. Não usamos cookies de publicidade.",
        fr: "Nous utilisons uniquement un cookie pour mémoriser la langue choisie. Aucun cookie publicitaire.",
        nl: "We gebruiken enkel een cookie om de gekozen taal te onthouden. Geen advertentiecookies.",
      },
    },
  ],
};
