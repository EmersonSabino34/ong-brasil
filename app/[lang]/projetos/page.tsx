import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flags } from "@/components/flags";
import { ArrowRight } from "@/components/icons";
import { ProjectsBrowser } from "@/components/projects-browser";
import { StatusBadge } from "@/components/project-card";
import { PageHeader, SectionTitle } from "@/components/ui";
import { areas } from "@/lib/content/areas";
import { projectsPage as pp } from "@/lib/content/pages";
import { projects } from "@/lib/content/projects";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: pp.title[lang], description: pp.subtitle[lang], alternates: { canonical: `/${lang}/projetos` } };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projetos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  const active = projects.filter((p) => p.status === "ativo");
  const expansion = projects.filter((p) => p.status === "implantacao");

  return (
    <>
      <PageHeader
        title={t(pp.title)}
        subtitle={t(pp.subtitle)}
        image={img.criancasAlegria}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(pp.title) }]}
      />

      <section id="brasil" className="container-site py-14">
        <SectionTitle align="left" className="mb-6">
          {t(pp.brazil)}
        </SectionTitle>
        <ProjectsBrowser
          projects={active.map((p) => ({
            slug: p.slug,
            href: href(lang, `/projetos/${p.slug}`),
            image: p.image,
            icon: p.icon,
            title: t(p.title),
            summary: t(p.summary),
            area: p.area ?? "",
          }))}
          areas={areas.map((a) => ({ key: a.slug, label: t(a.title) }))}
          labels={{ all: t(pp.all), filter: t(pp.filter), cta: t(pp.details) }}
        />
      </section>

      <section id="expansao" className="bg-white py-14">
        <div className="container-site">
          <SectionTitle className="mb-3">{t(pp.expansion)}</SectionTitle>
          <p className="mx-auto mb-9 max-w-2xl text-center text-lg text-ink/85">{t(pp.expansionText)}</p>
          <ul className="grid gap-6 md:grid-cols-2">
            {expansion.map((p) => {
              const Flag = flags[p.country];
              return (
                <li key={p.slug} id={p.country === "pt" ? "portugal" : "belgica"}>
                  <Link
                    href={href(lang, `/projetos/${p.slug}`)}
                    className="group grid overflow-hidden rounded-2xl bg-cream ring-1 ring-black/5 transition hover:shadow-lg sm:grid-cols-[2fr_3fr]"
                  >
                    <div className="relative aspect-16/10 sm:aspect-auto">
                      <Image src={p.image} alt="" fill sizes="(min-width: 768px) 25vw, 100vw" placeholder="blur" className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <Flag className="h-7! w-10!" />
                        <StatusBadge tone="gold">{t(ui.status.implantacao)}</StatusBadge>
                      </div>
                      <h3 className="font-serif text-xl font-black text-navy-900">{t(p.title)}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{t(p.description)}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-navy-700 group-hover:text-gold-700">
                        {t(pp.details)} <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
