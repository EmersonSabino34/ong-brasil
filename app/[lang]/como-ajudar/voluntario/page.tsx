import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { Globe } from "@/components/icons";
import { PageHeader, SectionTitle } from "@/components/ui";
import { help, volunteer } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/como-ajudar/voluntario">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: volunteer.title[lang], description: volunteer.subtitle[lang], alternates: { canonical: `/${lang}/como-ajudar/voluntario` } };
}

export default async function VolunteerPage({ params }: PageProps<"/[lang]/como-ajudar/voluntario">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader
        title={t(volunteer.title)}
        subtitle={t(volunteer.subtitle)}
        image={img.voluntario}
        crumbs={[
          { label: t(ui.home), href: href(lang) },
          { label: t(help.title), href: href(lang, "/como-ajudar") },
          { label: t(volunteer.title) },
        ]}
      />

      <section className="container-site grid gap-10 py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <div>
          <SectionTitle align="left" className="mb-7">
            {t(volunteer.stepsTitle)}
          </SectionTitle>
          <ol className="space-y-5">
            {volunteer.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-400 font-serif text-lg font-black text-navy-900">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">{t(s.title)}</h3>
                  <p className="text-[15.5px] text-ink/85">{t(s.text)}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex gap-3 rounded-2xl bg-navy-50 p-5 text-[15.5px] leading-relaxed text-navy-900">
            <Globe size={24} className="shrink-0 text-navy-700" /> {t(volunteer.why)}
          </p>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-black text-navy-900">{t(volunteer.formTitle)}</h2>
          <VolunteerForm lang={lang} />
        </div>
      </section>
    </>
  );
}
