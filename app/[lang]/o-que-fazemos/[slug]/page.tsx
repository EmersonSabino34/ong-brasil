import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Heart, Icon, Users } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { PageHeader, SectionTitle } from "@/components/ui";
import { areas, getArea } from "@/lib/content/areas";
import { projectsPage, whatWeDo } from "@/lib/content/pages";
import { projects } from "@/lib/content/projects";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/o-que-fazemos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const area = getArea(slug);
  if (!hasLocale(lang) || !area) return {};
  return {
    title: area.title[lang],
    description: area.intro[lang],
    alternates: { canonical: `/${lang}/o-que-fazemos/${slug}` },
    openGraph: { images: [{ url: area.image.src }] },
  };
}

export default async function AreaPage({ params }: PageProps<"/[lang]/o-que-fazemos/[slug]">) {
  const { lang, slug } = await params;
  const area = getArea(slug);
  if (!hasLocale(lang) || !area) notFound();
  const t = translator(lang);
  const related = projects.filter((p) => p.area === area.slug);
  const otherAreas = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHeader
        title={t(area.title)}
        subtitle={t(area.short)}
        image={area.image}
        crumbs={[
          { label: t(ui.home), href: href(lang) },
          { label: t(whatWeDo.title), href: href(lang, "/o-que-fazemos") },
          { label: t(area.title) },
        ]}
      />

      <section className="container-site grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div>
          <p className="mb-6 border-l-4 border-gold-500 pl-5 font-serif text-xl font-bold leading-relaxed text-navy-900 sm:text-2xl">{t(area.intro)}</p>
          <div className="prose-ong text-[17px]">
            {area.body.map((p, i) => (
              <p key={i}>{t(p)}</p>
            ))}
          </div>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-black text-navy-900">{t(whatWeDo.howTitle)}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {area.actions.map((a, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 font-semibold text-navy-900 ring-1 ring-black/5">
                <CheckCircle size={22} className="shrink-0 text-leaf-600" /> {t(a)}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image src={area.image} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="rounded-2xl bg-navy-800 p-6 text-white">
            <div className="mb-3 flex items-center gap-3">
              <Icon name={area.icon} size={34} strokeWidth={1.6} className="text-gold-400" />
              <h2 className="font-serif text-xl font-black">{t(whatWeDo.supportArea)}</h2>
            </div>
            <p className="text-white/85">{t(projectsPage.supportText)}</p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link href={href(lang, `/doe?destino=${area.slug}`)} className="btn-gold py-3">
                {t(ui.donate)} <Heart size={18} />
              </Link>
              <Link href={href(lang, "/como-ajudar/voluntario")} className="btn border-2 border-white/40 py-3 text-white hover:bg-white/10">
                <Users size={18} /> {t(whatWeDo.volunteerArea)}
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-14">
          <div className="container-site">
            <SectionTitle className="mb-8">{t(whatWeDo.related)}</SectionTitle>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard
                    href={href(lang, `/projetos/${p.slug}`)}
                    image={p.image}
                    icon={p.icon}
                    title={t(p.title)}
                    summary={t(p.description)}
                    cta={t(projectsPage.details)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="container-site py-12">
        <h2 className="mb-5 text-center text-sm font-black uppercase tracking-widest text-muted">{t(whatWeDo.otherAreas)}</h2>
        <ul className="card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line">
          {otherAreas.map((a) => (
            <li key={a.slug}>
              <Link
                href={href(lang, `/o-que-fazemos/${a.slug}`)}
                className="group flex items-center gap-3 rounded-2xl px-4 py-4 transition hover:bg-navy-50 lg:justify-center"
              >
                <Icon name={a.icon} size={32} strokeWidth={1.5} className="shrink-0 text-navy-900 group-hover:text-gold-600" />
                <span className="text-[14.5px] font-extrabold leading-tight text-navy-900">{t(a.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
