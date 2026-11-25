import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flags } from "@/components/flags";
import { Heart, Icon, Star, Users } from "@/components/icons";
import { StatusBadge } from "@/components/project-card";
import { PageHeader, SectionTitle } from "@/components/ui";
import { about } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/quem-somos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: about.title[lang], description: about.subtitle[lang], alternates: { canonical: `/${lang}/quem-somos` } };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/quem-somos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  const countries = [
    { code: "br" as const, status: "ativo" as const, city: "São Paulo" },
    { code: "pt" as const, status: "implantacao" as const },
    { code: "be" as const, status: "implantacao" as const },
  ];

  return (
    <>
      <PageHeader
        title={t(about.title)}
        subtitle={t(about.subtitle)}
        image={img.equipeVoluntarios}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(about.title) }]}
      />

      {/* História */}
      <section id="historia" className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionTitle align="left" className="mb-6">
            {t(about.historyTitle)}
          </SectionTitle>
          <div className="prose-ong text-[17px]">
            {about.history.map((p, i) => (
              <p key={i}>{t(p)}</p>
            ))}
          </div>
          <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl shadow-lg">
            <Image src={img.criancasSorrindo} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
        </div>

        <ol className="relative space-y-7 border-l-2 border-gold-500/60 pl-8 lg:mt-16">
          {about.timeline.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-10.5 top-0.5 grid size-5 place-items-center rounded-full bg-gold-500 ring-4 ring-cream" aria-hidden="true" />
              <p className="font-serif text-2xl font-black text-gold-700">{item.year}</p>
              <h3 className="text-lg font-extrabold text-navy-900">{t(item.title)}</h3>
              <p className="mt-1 text-[15.5px] leading-relaxed text-ink/85">{t(item.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Números */}
      <section className="bg-navy-800 text-white">
        <ul className="container-site grid grid-cols-2 gap-y-8 py-12 lg:grid-cols-4">
          {about.numbers.map((n) => (
            <li key={n.value} className="text-center">
              <p className="font-serif text-4xl font-black text-gold-400 sm:text-5xl">{n.value}</p>
              <p className="mt-1 text-[15px] font-semibold text-white/85">{t(n.label)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Missão, visão e valores */}
      <section id="missao" className="container-site py-16">
        <SectionTitle className="mb-10">{t(about.mvvTitle)}</SectionTitle>
        <div className="grid gap-6 lg:grid-cols-3">
          {[about.mission, about.vision].map((item) => (
            <div key={item.title.pt} className="card p-7">
              <Icon name={item.icon} size={42} strokeWidth={1.5} className="text-gold-600" />
              <h3 className="mt-4 font-serif text-2xl font-black text-navy-900">{t(item.title)}</h3>
              <p className="mt-3 text-[16.5px] leading-relaxed text-ink/90">{t(item.text)}</p>
            </div>
          ))}
          <div className="card p-7">
            <Star size={42} strokeWidth={1.5} className="text-gold-600" />
            <h3 className="mt-4 font-serif text-2xl font-black text-navy-900">{t(about.valuesTitle)}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.values.map((v) => (
                <li key={v.pt} className="rounded-full bg-navy-50 px-3.5 py-1.5 text-[15px] font-bold text-navy-900">
                  {t(v)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="bg-white py-16">
        <div className="container-site">
          <SectionTitle className="mb-3">{t(about.teamTitle)}</SectionTitle>
          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-ink/85">{t(about.teamIntro)}</p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.map((m) => (
              <li key={m.title.pt} className="rounded-2xl bg-cream p-6 ring-1 ring-black/5">
                <span className="grid size-14 place-items-center rounded-full bg-navy-700 text-white">
                  <Icon name={m.icon} size={26} />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-navy-900">{t(m.title)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{t(m.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Onde atuamos */}
      <section id="atuacao" className="container-site py-16">
        <SectionTitle className="mb-10">{t(about.whereTitle)}</SectionTitle>
        <ul className="grid gap-6 md:grid-cols-3">
          {countries.map((c) => {
            const Flag = flags[c.code];
            return (
              <li key={c.code} className="card flex flex-col items-start p-7">
                <Flag className="h-12! w-18! rounded shadow" />
                <h3 className="mt-5 font-serif text-2xl font-black text-navy-900">
                  {t(ui.countries[c.code])}
                  {c.city && <span className="text-lg font-bold text-muted"> – {c.city}</span>}
                </h3>
                <div className="mt-2">
                  <StatusBadge tone={c.status === "ativo" ? "leaf" : "gold"}>{t(ui.status[c.status])}</StatusBadge>
                </div>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink/85">{t(about.where[c.code])}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-gold-50 px-6 py-10 text-center ring-1 ring-gold-300/50">
          <h2 className="font-serif text-2xl font-black text-navy-900 sm:text-3xl">{t(about.joinUs)}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={href(lang, "/doe")} className="btn-gold px-7 py-3.5 text-[17px]">
              {t(ui.donate)} <Heart size={18} />
            </Link>
            <Link href={href(lang, "/como-ajudar/voluntario")} className="btn-outline-gold px-7 py-3.5 text-[17px]">
              <Users size={18} /> {t({ pt: "Seja Voluntário", fr: "Devenir bénévole", nl: "Vrijwilliger worden" })}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
