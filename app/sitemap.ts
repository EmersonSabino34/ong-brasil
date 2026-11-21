import type { MetadataRoute } from "next";
import { areas } from "@/lib/content/areas";
import { news } from "@/lib/content/news";
import { projects } from "@/lib/content/projects";
import { localeLabels, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const staticPaths = [
  "",
  "/quem-somos",
  "/o-que-fazemos",
  "/projetos",
  "/como-ajudar",
  "/como-ajudar/voluntario",
  "/como-ajudar/parcerias",
  "/doe",
  "/transparencia",
  "/noticias",
  "/galeria",
  "/contato",
  "/privacidade",
  "/cadastro",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...areas.map((a) => `/o-que-fazemos/${a.slug}`),
    ...projects.map((p) => `/projetos/${p.slug}`),
    ...news.map((n) => `/noticias/${n.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      changeFrequency: path.startsWith("/noticias") ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/doe" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
