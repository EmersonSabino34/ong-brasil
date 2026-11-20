import type { T } from "@/lib/i18n";
import { areas } from "./areas";
import { projects } from "./projects";

export type NavLink = { label: T; path: string };
export type NavItem = NavLink & { key: string; children?: NavLink[] };

/** Menu principal (igual ao layout). Os caminhos não têm o prefixo de idioma. */
export const nav: NavItem[] = [
  { key: "inicio", label: { pt: "Início", fr: "Accueil", nl: "Home" }, path: "/" },
  {
    key: "quem-somos",
    label: { pt: "Quem Somos", fr: "Qui sommes-nous", nl: "Over ons" },
    path: "/quem-somos",
    children: [
      { label: { pt: "Nossa História", fr: "Notre histoire", nl: "Ons verhaal" }, path: "/quem-somos#historia" },
      { label: { pt: "Missão, Visão e Valores", fr: "Mission, vision et valeurs", nl: "Missie, visie en waarden" }, path: "/quem-somos#missao" },
      { label: { pt: "Nossa Equipe", fr: "Notre équipe", nl: "Ons team" }, path: "/quem-somos#equipe" },
      { label: { pt: "Onde Atuamos", fr: "Où nous agissons", nl: "Waar we actief zijn" }, path: "/quem-somos#atuacao" },
    ],
  },
  {
    key: "o-que-fazemos",
    label: { pt: "O Que Fazemos", fr: "Nos actions", nl: "Wat we doen" },
    path: "/o-que-fazemos",
    children: areas.map((a) => ({ label: a.title, path: `/o-que-fazemos/${a.slug}` })),
  },
  {
    key: "projetos",
    label: { pt: "Projetos", fr: "Projets", nl: "Projecten" },
    path: "/projetos",
    children: [
      { label: { pt: "Todos os Projetos", fr: "Tous les projets", nl: "Alle projecten" }, path: "/projetos" },
      ...projects
        .filter((p) => p.status === "ativo")
        .map((p) => ({ label: p.title, path: `/projetos/${p.slug}` })),
      { label: { pt: "Expansão: Portugal e Bélgica", fr: "Expansion : Portugal et Belgique", nl: "Uitbreiding: Portugal en België" }, path: "/projetos#expansao" },
    ],
  },
  {
    key: "como-ajudar",
    label: { pt: "Como Ajudar", fr: "Comment aider", nl: "Hoe helpen" },
    path: "/como-ajudar",
    children: [
      { label: { pt: "Doe Agora", fr: "Faire un don", nl: "Doneer nu" }, path: "/doe" },
      { label: { pt: "Seja um Doador Mensal", fr: "Don mensuel", nl: "Maandelijks schenken" }, path: "/doe?tipo=mensal" },
      { label: { pt: "Doação de Itens", fr: "Don d’objets", nl: "Goederen schenken" }, path: "/como-ajudar#itens" },
      { label: { pt: "Seja Voluntário", fr: "Devenir bénévole", nl: "Vrijwilliger worden" }, path: "/como-ajudar/voluntario" },
      { label: { pt: "Parcerias", fr: "Partenariats", nl: "Partnerschappen" }, path: "/como-ajudar/parcerias" },
    ],
  },
  {
    key: "transparencia",
    label: { pt: "Transparência", fr: "Transparence", nl: "Transparantie" },
    path: "/transparencia",
    children: [
      { label: { pt: "Aplicação dos Recursos", fr: "Utilisation des fonds", nl: "Besteding van middelen" }, path: "/transparencia#recursos" },
      { label: { pt: "Relatórios Anuais", fr: "Rapports annuels", nl: "Jaarverslagen" }, path: "/transparencia#relatorios" },
      { label: { pt: "Documentos Institucionais", fr: "Documents institutionnels", nl: "Officiële documenten" }, path: "/transparencia#documentos" },
    ],
  },
  { key: "noticias", label: { pt: "Notícias", fr: "Actualités", nl: "Nieuws" }, path: "/noticias" },
  { key: "galeria", label: { pt: "Galeria", fr: "Galerie", nl: "Galerij" }, path: "/galeria" },
  { key: "contato", label: { pt: "Contato", fr: "Contact", nl: "Contact" }, path: "/contato" },
];

/** Colunas do "Mapa do Site" no rodapé (igual ao layout). */
export const footerColumns: string[][] = [
  ["inicio", "quem-somos", "o-que-fazemos"],
  ["projetos", "como-ajudar", "transparencia"],
  ["noticias", "galeria", "contato"],
];

export function navByKey(key: string) {
  return nav.find((n) => n.key === key)!;
}
