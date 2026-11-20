import type { Metadata } from "next";
import { Caveat, Merriweather, Nunito_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { ui } from "@/lib/content/ui";
import { hasLocale, localeLabels, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const descriptions = {
  pt: "Acolhimento, alimento, educação, arte, esporte e oportunidades para crianças, adolescentes e famílias em situação de vulnerabilidade. Brasil, Portugal e Bélgica.",
  fr: "Accueil, alimentation, éducation, art, sport et opportunités pour les enfants, les adolescents et les familles en situation de vulnérabilité. Brésil, Portugal et Belgique.",
  nl: "Opvang, voeding, onderwijs, kunst, sport en kansen voor kinderen, jongeren en gezinnen in een kwetsbare situatie. Brazilië, Portugal en België.",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} ONG`, template: `%s | ${site.name} ONG` },
    description: descriptions[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: `${site.name} ONG`,
      locale: localeLabels[lang].htmlLang.replace("-", "_"),
      images: [{ url: "/images/layout/hero.jpg", width: 3072, height: 560 }],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={localeLabels[lang].htmlLang}
      className={`${merriweather.variable} ${nunito.variable} ${caveat.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-gold-400 px-4 py-2 font-bold text-navy-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {ui.skip[lang]}
        </a>
        <Header lang={lang} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
