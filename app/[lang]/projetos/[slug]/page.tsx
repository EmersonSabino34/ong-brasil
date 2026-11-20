import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flags } from "@/components/flags";
import { Calendar, CheckCircle, Heart, MapPin, Users } from "@/components/icons";
import { ProjectCard, StatusBadge } from "@/components/project-card";
import { formatStat, PageHeader, SectionTitle } from "@/components/ui";
import { getArea } from "@/lib/content/areas";
import { projectsPage as pp, whatWeDo } from "@/lib/content/pages";
import { getProject, projects } from "@/lib/content/projects";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  return {
    title: project.title[lang],
    description: project.description[lang],
    alternates: { canonical: `/${lang}/projetos/${slug}` },
    openGraph: { images: [{ url: project.image.src }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();
  const t = translator(lang);
  const area = project.area ? getArea(project.area) : undefined;
  const Flag = flags[project.country];
  const others = projects.filter((p) => p.slug !== project.slug && p.status === "ativo").slice(0, 3);
  const donateHref = href(lang, `/doe${area ? `?destino=${area.slug}` : ""}`);

  const facts = [
    { Icon: Users, label: t(pp.audience), value: t(project.audience) },
    { Icon: Calendar, label: t(pp.schedule), value: t(project.schedule) },
    { Icon: MapPin, label: t(pp.place), value: t(project.place) },
  ];

  return (
    <>
      <PageHeader
        title={t(project.title)}
        subtitle={t(project.summary)}
        image={project.image}
        crumbs={[
          { label: t(ui.home), href: href(lang) },
          { label: t(pp.title), href: href(lang, "/projetos") },
          { label: t(project.title) },
        ]}
      />

      <div className="container-site grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Flag className="!h-6 !w-9" />
            <span className="font-bold text-navy-900">{t(ui.countries[project.country])}</span>
            <StatusBadge tone={project.status === "ativo" ? "leaf" : "gold"}>{t(ui.status[project.status])}</StatusBadge>
          </div>

          <SectionTitle align="left" as="h2" className="mb-5">
            {t(pp.about)}
          </SectionTitle>
          <div className="prose-ong max-w-3xl text-[17px]">
            <p className="text-lg font-semibold text-navy-900">{t(project.description)}</p>
            {area?.body.map((paragraph, i) => <p key={i}>{t(paragraph)}</p>)}
          </div>

          {area && (
            <>
              <h3 className="mb-4 mt-9 font-serif text-xl font-black text-navy-900">{t(whatWeDo.howTitle)}</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {area.actions.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 font-semibold text-navy-900 ring-1 ring-black/5">
                    <CheckCircle size={22} className="shrink-0 text-leaf-600" /> {t(a)}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="mb-4 mt-10 font-serif text-xl font-black text-navy-900">{t(pp.photos)}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[project.image, ...project.gallery].map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[2/1] sm:col-span-1 sm:aspect-square" : "aspect-square"}`}>
                <Image src={photo} alt="" fill sizes="(min-width: 640px) 30vw, 50vw" placeholder="blur" className="object-cover" />
              </div>
            ))}
          </div>
          <Link href={href(lang, "/galeria")} className="mt-4 inline-block text-sm font-extrabold text-navy-700 hover:text-gold-700">
            {t(ui.seeAll)} →
          </Link>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-6">
            <dl className="space-y-4">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon size={22} className="mt-0.5 shrink-0 text-gold-600" />
                  <div>
                    <dt className="text-xs font-black uppercase tracking-wider text-muted">{label}</dt>
                    <dd className="font-semibold text-navy-900">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {project.stats.length > 0 && (
            <div className="card grid grid-cols-2 divide-x divide-line p-2">
              {project.stats.map((s) => (
                <div key={s.label.pt} className="px-4 py-4 text-center">
                  <p className="font-serif text-3xl font-black text-navy-900">{formatStat(s.n, lang, s.prefix, s.suffix)}</p>
                  <p className="mt-1 text-[13px] font-semibold leading-tight text-muted">{t(s.label)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl bg-navy-800 p-6 text-white">
            <h3 className="font-serif text-xl font-black">{t(pp.support)}</h3>
            <p className="mt-2 text-white/85">{t(pp.supportText)}</p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link href={donateHref} className="btn-gold py-3">
                {t(ui.donate)} <Heart size={18} />
              </Link>
              <Link href={href(lang, "/como-ajudar/voluntario")} className="btn border-2 border-white/40 text-white hover:bg-white/10">
                {t(whatWeDo.volunteerArea)}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <section className="bg-white py-14">
        <div className="container-site">
          <SectionTitle className="mb-8">{t(pp.others)}</SectionTitle>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <ProjectCard href={href(lang, `/projetos/${p.slug}`)} image={p.image} icon={p.icon} title={t(p.title)} summary={t(p.summary)} cta={t(pp.details)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
