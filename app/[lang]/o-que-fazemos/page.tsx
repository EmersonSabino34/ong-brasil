import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/ui";
import { areas } from "@/lib/content/areas";
import { whatWeDo } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/o-que-fazemos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: whatWeDo.title[lang], description: whatWeDo.subtitle[lang], alternates: { canonical: `/${lang}/o-que-fazemos` } };
}

export default async function WhatWeDoPage({ params }: PageProps<"/[lang]/o-que-fazemos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader
        title={t(whatWeDo.title)}
        subtitle={t(whatWeDo.subtitle)}
        image={img.criancasGrupo}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(whatWeDo.title) }]}
      />
      <section className="container-site py-14">
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug}>
              <ProjectCard
                href={href(lang, `/o-que-fazemos/${a.slug}`)}
                image={a.image}
                icon={a.icon}
                title={t(a.title)}
                summary={t(a.intro)}
                cta={t(ui.learnMore)}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
