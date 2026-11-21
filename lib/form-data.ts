import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";

/** Ajudantes para ler formulários nas Server Actions. */

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(data: FormData, key: string, max = 2000) {
  return String(data.get(key) ?? "").trim().slice(0, max);
}

export function getLang(data: FormData): Locale {
  const lang = str(data, "lang", 5);
  return hasLocale(lang) ? lang : defaultLocale;
}

/** Campo invisível "website": robôs preenchem, pessoas não. */
export function isBot(data: FormData) {
  return str(data, "website").length > 0;
}

export function values(data: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((k) => [k, str(data, k)]));
}
