"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Heart } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { hasLocale, type Locale } from "@/lib/i18n";

const text = {
  title: { pt: "Página não encontrada", fr: "Page introuvable", nl: "Pagina niet gevonden" },
  body: {
    pt: "O endereço pode ter mudado ou não existe mais. Mas a esperança continua por aqui!",
    fr: "L’adresse a peut-être changé ou n’existe plus. Mais l’espoir, lui, est toujours là !",
    nl: "Het adres is misschien gewijzigd of bestaat niet meer. Maar de hoop blijft!",
  },
  home: { pt: "Voltar ao início", fr: "Retour à l’accueil", nl: "Terug naar home" },
  donate: { pt: "Doe Agora", fr: "Faire un don", nl: "Doneer nu" },
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang: Locale = params?.lang && hasLocale(params.lang) ? params.lang : "pt";
  return (
    <section className="container-site flex flex-col items-center py-24 text-center">
      <LogoMark className="h-24 w-auto" />
      <p className="mt-6 font-serif text-7xl font-black text-gold-500">404</p>
      <h1 className="mt-2 font-serif text-3xl font-black text-navy-900">{text.title[lang]}</h1>
      <p className="mt-3 max-w-md text-lg text-ink/85">{text.body[lang]}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={`/${lang}`} className="btn-navy px-6 py-3">
          {text.home[lang]} <ArrowRight size={18} />
        </Link>
        <Link href={`/${lang}/doe`} className="btn-gold px-6 py-3">
          {text.donate[lang]} <Heart size={18} />
        </Link>
      </div>
    </section>
  );
}
