import type { Metadata } from "next";
import { Merriweather, Nunito_Sans } from "next/font/google";
import { LogoMark } from "@/components/logo";
import "./globals.css";

const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "404 – Infinita Esperança ONG",
  description: "Página não encontrada · Page introuvable · Pagina niet gevonden",
};

const links = [
  { href: "/pt", label: "Voltar ao início", lang: "pt" },
  { href: "/fr", label: "Retour à l’accueil", lang: "fr" },
  { href: "/nl", label: "Terug naar home", lang: "nl" },
];

/** 404 para endereços que não existem em nenhum idioma. */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${merriweather.variable} ${nunito.variable} antialiased`}>
      <body className="grid min-h-dvh place-items-center bg-cream px-4">
        <main className="flex flex-col items-center py-16 text-center">
          <LogoMark className="h-24 w-auto" />
          <p className="mt-6 font-serif text-7xl font-black text-gold-500">404</p>
          <h1 className="mt-2 font-serif text-2xl font-black text-navy-900 sm:text-3xl">
            Página não encontrada · <span lang="fr">Page introuvable</span> · <span lang="nl">Pagina niet gevonden</span>
          </h1>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} lang={l.lang} className="btn-navy px-5 py-3">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
