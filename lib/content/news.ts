import type { StaticImageData } from "next/image";
import type { T } from "@/lib/i18n";
import { img } from "@/lib/images";

export type NewsItem = {
  slug: string;
  date: string; // AAAA-MM-DD
  category: T;
  image: StaticImageData;
  title: T;
  excerpt: T;
  body: T[];
};

const cat = {
  esporte: { pt: "Esporte", fr: "Sport", nl: "Sport" },
  arte: { pt: "Arte", fr: "Art", nl: "Kunst" },
  expansao: { pt: "Expansão", fr: "Expansion", nl: "Uitbreiding" },
  alimentacao: { pt: "Alimentação", fr: "Alimentation", nl: "Voeding" },
  educacao: { pt: "Educação", fr: "Éducation", nl: "Onderwijs" },
  doacoes: { pt: "Doações", fr: "Dons", nl: "Giften" },
} satisfies Record<string, T>;

/** Notícias de exemplo – ordenadas da mais recente para a mais antiga. */
export const news: NewsItem[] = [
  {
    slug: "torneio-de-futebol-social",
    date: "2026-11-10",
    category: cat.esporte,
    image: img.futebol,
    title: {
      pt: "Torneio de Futebol Social reúne crianças de toda a comunidade",
      fr: "Le tournoi de Football Social rassemble les enfants de tout le quartier",
      nl: "Sociaal Voetbaltoernooi brengt kinderen uit de hele buurt samen",
    },
    excerpt: {
      pt: "Um sábado de jogos, torcida e muito fair play encerrou a temporada do Projeto Futebol Social.",
      fr: "Un samedi de matchs, d’encouragements et de fair-play a clôturé la saison du Projet Football Social.",
      nl: "Een zaterdag vol wedstrijden, supporters en fairplay sloot het seizoen van Project Sociaal Voetbal af.",
    },
    body: [
      {
        pt: "O torneio de encerramento da temporada reuniu as equipes do Projeto Futebol Social, familiares e vizinhos. Mais do que os gols, o destaque foi o espírito de equipe e o respeito entre os times.",
        fr: "Le tournoi de fin de saison a réuni les équipes du Projet Football Social, les familles et les voisins. Plus que les buts, ce sont l’esprit d’équipe et le respect entre les joueurs qui ont marqué la journée.",
        nl: "Het slottoernooi van het seizoen bracht de teams van Project Sociaal Voetbal, familie en buren samen. Belangrijker dan de doelpunten waren de teamgeest en het respect tussen de ploegen.",
      },
      {
        pt: "Cada criança recebeu uma medalha de participação, e os atletas com melhor frequência escolar foram homenageados — porque, no nosso projeto, estudar faz parte do treino.",
        fr: "Chaque enfant a reçu une médaille de participation, et les joueurs les plus assidus à l’école ont été mis à l’honneur, car dans notre projet, étudier fait partie de l’entraînement.",
        nl: "Elk kind kreeg een deelnamemedaille en de spelers met de beste schoolaanwezigheid werden in de bloemetjes gezet, want in ons project hoort studeren bij de training.",
      },
      {
        pt: "Agradecemos aos voluntários, árbitros e parceiros que tornaram o dia possível. As inscrições para a próxima temporada abrem em fevereiro.",
        fr: "Merci aux bénévoles, aux arbitres et aux partenaires qui ont rendu cette journée possible. Les inscriptions pour la prochaine saison ouvriront en février.",
        nl: "Dank aan de vrijwilligers, scheidsrechters en partners die deze dag mogelijk maakten. De inschrijvingen voor het volgende seizoen openen in februari.",
      },
    ],
  },
  {
    slug: "bazar-solidario-das-oficinas",
    date: "2026-10-22",
    category: cat.arte,
    image: img.oficinas,
    title: {
      pt: "Bazar solidário mostra a arte criada nas oficinas",
      fr: "Un bazar solidaire met en valeur les créations des ateliers",
      nl: "Solidaire bazaar toont de kunst uit onze workshops",
    },
    excerpt: {
      pt: "Peças de cerâmica, pintura e costura foram vendidas e a renda voltou para as famílias participantes.",
      fr: "Céramiques, peintures et couture ont été vendues, et les recettes sont revenues aux familles participantes.",
      nl: "Keramiek, schilderijen en naaiwerk werden verkocht en de opbrengst ging naar de deelnemende gezinnen.",
    },
    body: [
      {
        pt: "O bazar de primavera apresentou ao público as peças produzidas ao longo do semestre nas Oficinas Artesanais: vasos pintados à mão, bolsas de tecido, quadros e bordados.",
        fr: "Le bazar de printemps a présenté au public les pièces réalisées au fil du semestre dans les Ateliers artisanaux : vases peints à la main, sacs en tissu, tableaux et broderies.",
        nl: "De lentebazaar toonde het publiek wat er dit semester in de ambachtelijke workshops werd gemaakt: handbeschilderde vazen, stoffen tassen, schilderijen en borduurwerk.",
      },
      {
        pt: "Toda a renda foi repassada às mães e aos jovens artesãos, fortalecendo a geração de renda e a autoestima de quem participa das oficinas.",
        fr: "L’intégralité des recettes a été reversée aux mères et aux jeunes artisans, renforçant leurs revenus et leur estime de soi.",
        nl: "De volledige opbrengst ging naar de moeders en jonge makers, wat hun inkomen en zelfvertrouwen versterkt.",
      },
    ],
  },
  {
    slug: "primeiros-passos-em-portugal",
    date: "2026-09-30",
    category: cat.expansao,
    image: img.maosUnidas,
    title: {
      pt: "Infinita Esperança dá os primeiros passos em Portugal e na Bélgica",
      fr: "Infinita Esperança fait ses premiers pas au Portugal et en Belgique",
      nl: "Infinita Esperança zet de eerste stappen in Portugal en België",
    },
    excerpt: {
      pt: "Começamos a formar equipes de voluntários e a conversar com parceiros locais para os primeiros projetos na Europa.",
      fr: "Nous commençons à former des équipes de bénévoles et à rencontrer des partenaires locaux pour nos premiers projets en Europe.",
      nl: "We stellen vrijwilligersteams samen en praten met lokale partners over onze eerste projecten in Europa.",
    },
    body: [
      {
        pt: "Depois de mais de uma década de trabalho em São Paulo, a Infinita Esperança inicia a implantação em Portugal e na Bélgica, onde vivem muitas famílias brasileiras e de língua portuguesa.",
        fr: "Après plus de dix ans d’action à São Paulo, Infinita Esperança s’implante au Portugal et en Belgique, où vivent de nombreuses familles brésiliennes et lusophones.",
        nl: "Na meer dan tien jaar werk in São Paulo start Infinita Esperança in Portugal en België, waar veel Braziliaanse en Portugeestalige gezinnen wonen.",
      },
      {
        pt: "Nesta primeira fase, estamos mapeando necessidades, formando equipes de voluntários e conversando com associações e instituições locais.",
        fr: "Dans cette première phase, nous identifions les besoins, formons des équipes de bénévoles et rencontrons des associations et institutions locales.",
        nl: "In deze eerste fase brengen we noden in kaart, vormen we vrijwilligersteams en praten we met lokale verenigingen en instellingen.",
      },
      {
        pt: "Quer ajudar a construir esse caminho? Inscreva-se como voluntário ou fale conosco sobre parcerias.",
        fr: "Vous souhaitez nous aider à construire ce chemin ? Inscrivez-vous comme bénévole ou contactez-nous pour un partenariat.",
        nl: "Wilt u mee bouwen aan dit verhaal? Schrijf u in als vrijwilliger of neem contact op over een partnerschap.",
      },
    ],
  },
  {
    slug: "mutirao-de-cestas-basicas",
    date: "2026-08-18",
    category: cat.alimentacao,
    image: img.voluntariosCaixas,
    title: {
      pt: "Mutirão de voluntários monta 300 cestas básicas",
      fr: "Une journée bénévole permet de préparer 300 colis alimentaires",
      nl: "Vrijwilligers stellen samen 300 voedselpakketten samen",
    },
    excerpt: {
      pt: "Em um único dia, voluntários separaram e embalaram alimentos para as famílias acompanhadas.",
      fr: "En une seule journée, des bénévoles ont trié et emballé des denrées pour les familles accompagnées.",
      nl: "Op één dag sorteerden en verpakten vrijwilligers voedsel voor de gezinnen die we begeleiden.",
    },
    body: [
      {
        pt: "Graças às doações recebidas na campanha de agosto, voluntários se reuniram na sede para montar 300 cestas básicas, entregues às famílias da Rede de Apoio Familiar.",
        fr: "Grâce aux dons reçus lors de la campagne d’août, des bénévoles se sont réunis au siège pour préparer 300 colis alimentaires, remis aux familles du Réseau de soutien familial.",
        nl: "Dankzij de giften van de augustusactie kwamen vrijwilligers samen in de hoofdzetel om 300 voedselpakketten samen te stellen voor de gezinnen van ons netwerk.",
      },
      {
        pt: "Cada cesta inclui itens básicos de alimentação e higiene. Obrigado a todos que doaram e dedicaram seu tempo!",
        fr: "Chaque colis contient des produits alimentaires et d’hygiène de base. Merci à toutes celles et ceux qui ont donné et offert leur temps !",
        nl: "Elk pakket bevat basisvoeding en hygiëneproducten. Bedankt aan iedereen die gaf en zijn tijd schonk!",
      },
    ],
  },
  {
    slug: "clube-de-leitura-completa-um-ano",
    date: "2026-07-05",
    category: cat.educacao,
    image: img.reforcoEscolar,
    title: {
      pt: "Clube de leitura completa um ano com acervo renovado",
      fr: "Le club de lecture fête son premier anniversaire avec de nouveaux livres",
      nl: "Leesclub viert eerste verjaardag met vernieuwde boekenkast",
    },
    excerpt: {
      pt: "Crianças do reforço escolar celebraram o primeiro aniversário do clube com contação de histórias.",
      fr: "Les enfants du soutien scolaire ont fêté le premier anniversaire du club avec des contes.",
      nl: "De kinderen van de bijles vierden de eerste verjaardag van de club met verhalen.",
    },
    body: [
      {
        pt: "Há um ano, o clube de leitura começou com algumas dezenas de livros doados. Hoje, o acervo ultrapassa 500 títulos e as crianças levam livros para ler em casa com a família.",
        fr: "Il y a un an, le club de lecture démarrait avec quelques dizaines de livres donnés. Aujourd’hui, la bibliothèque compte plus de 500 titres et les enfants emportent des livres à lire en famille.",
        nl: "Een jaar geleden begon de leesclub met enkele tientallen geschonken boeken. Vandaag telt de collectie meer dan 500 titels en nemen de kinderen boeken mee om thuis met het gezin te lezen.",
      },
      {
        pt: "A comemoração teve contação de histórias, oficina de marcadores de página e a entrega de novos livros doados por parceiros.",
        fr: "La fête comprenait des contes, un atelier de marque-pages et la remise de nouveaux livres offerts par des partenaires.",
        nl: "Op het feest waren er verhalen, een workshop boekenleggers maken en nieuwe boeken die partners schonken.",
      },
    ],
  },
  {
    slug: "campanha-do-agasalho",
    date: "2026-06-12",
    category: cat.doacoes,
    image: img.roupas,
    title: {
      pt: "Campanha do Agasalho arrecada mais de 2 mil peças",
      fr: "La campagne de vêtements d’hiver récolte plus de 2 000 pièces",
      nl: "Winterkledingactie haalt meer dan 2.000 stuks op",
    },
    excerpt: {
      pt: "Roupas de frio, cobertores e calçados foram distribuídos na loja solidária para enfrentar o inverno.",
      fr: "Vêtements chauds, couvertures et chaussures ont été distribués à la boutique solidaire pour affronter l’hiver.",
      nl: "Warme kleding, dekens en schoenen werden in de solidaire winkel uitgedeeld om de winter door te komen.",
    },
    body: [
      {
        pt: "Com a chegada do inverno em São Paulo, a Campanha do Agasalho arrecadou mais de 2 mil peças entre casacos, cobertores, meias e calçados.",
        fr: "Avec l’arrivée de l’hiver à São Paulo, la campagne a récolté plus de 2 000 pièces : manteaux, couvertures, chaussettes et chaussures.",
        nl: "Met de komst van de winter in São Paulo haalde de actie meer dan 2.000 stuks op: jassen, dekens, sokken en schoenen.",
      },
      {
        pt: "Tudo foi triado por voluntários e disponibilizado na loja solidária, onde as famílias escolhem o que precisam com dignidade.",
        fr: "Tout a été trié par des bénévoles et mis à disposition à la boutique solidaire, où les familles choisissent ce dont elles ont besoin, dans la dignité.",
        nl: "Alles werd door vrijwilligers gesorteerd en aangeboden in de solidaire winkel, waar gezinnen in waardigheid kiezen wat ze nodig hebben.",
      },
    ],
  },
];

export function getNews(slug: string) {
  return news.find((n) => n.slug === slug);
}
