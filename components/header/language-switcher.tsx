"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "@/components/icons";
import { LOCALE_COOKIE, localeLabels, locales, type Locale } from "@/lib/i18n";

function saveLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Troca a URL /pt/... por /fr/... mantendo a página atual. */
function switchPath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  parts[1] = locale;
  return parts.join("/") || `/${locale}`;
}

type Props = { lang: Locale; label: string; variant?: "compact" | "list" };

export function LanguageSwitcher({ lang, label, variant = "compact" }: Props) {
  const pathname = usePathname() ?? `/${lang}`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Ao esconder a página (navegação), fecha o menu
  useLayoutEffect(() => () => setOpen(false), []);

  if (variant === "list") {
    return (
      <div role="group" aria-label={label} className="grid grid-cols-3 gap-2">
        {locales.map((l) => (
          <Link
            key={l}
            href={switchPath(pathname, l)}
            onClick={() => saveLocale(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            className={`rounded-xl border px-3 py-2.5 text-center text-sm font-bold transition ${
              l === lang ? "border-gold-500 bg-gold-50 text-navy-900" : "border-line text-navy-900/80 hover:border-navy-600"
            }`}
          >
            {localeLabels[l].name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${label}: ${localeLabels[lang].name}`}
        className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 text-[13px] font-bold text-navy-900 transition hover:border-navy-600"
      >
        <Globe size={16} />
        {localeLabels[lang].short}
        <ChevronDown size={14} strokeWidth={2.5} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <ul className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl bg-white py-1.5 shadow-[0_18px_40px_-12px_rgb(6_28_52/0.35)] ring-1 ring-black/5">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={switchPath(pathname, l)}
                onClick={() => {
                  saveLocale(l);
                  setOpen(false);
                }}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
                className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-50"
              >
                <span>
                  <span className="mr-2 inline-block w-6 text-xs font-black text-navy-700/70">{localeLabels[l].short}</span>
                  {localeLabels[l].name}
                </span>
                {l === lang && <Check size={16} className="text-gold-600" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
