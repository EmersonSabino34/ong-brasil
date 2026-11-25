import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Painel e páginas da conta do apoiador não devem aparecer no Google.
      disallow: ["/admin", ...["minha-conta", "redefinir-senha", "esqueci-senha"].flatMap((p) => locales.map((l) => `/${l}/${p}`))],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
