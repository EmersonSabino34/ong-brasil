export const locales = ["pt", "fr", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string }> = {
  pt: { short: "PT", name: "Português", htmlLang: "pt-BR" },
  fr: { short: "FR", name: "Français", htmlLang: "fr-BE" },
  nl: { short: "NL", name: "Nederlands", htmlLang: "nl-BE" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Texto traduzido nos três idiomas. */
export type T = Record<Locale, string>;

/** Retorna uma função que escolhe a tradução do idioma atual. */
export function translator(lang: Locale) {
  return (value: T) => value[lang];
}

/** Monta um link interno com o prefixo do idioma: href("fr", "/contato") -> "/fr/contato". */
export function href(lang: Locale, path = "/") {
  if (path === "/" || path === "") return `/${lang}`;
  if (path.startsWith("#") || path.startsWith("?")) return `/${lang}${path}`;
  return `/${lang}${path}`;
}

export const dateLocale: Record<Locale, string> = { pt: "pt-BR", fr: "fr-BE", nl: "nl-BE" };

export function formatDate(iso: string, lang: Locale) {
  return new Intl.DateTimeFormat(dateLocale[lang], {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}
