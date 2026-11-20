import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartnerForm } from "@/components/forms/partner-form";
import { CheckCircle, Icon } from "@/components/icons";
import { PageHeader, SectionTitle } from "@/components/ui";
import { help, partners } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/como-ajudar/parcerias">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: partners.title[lang], description: partners.subtitle[lang], alternates: { canonical: `/${lang}/como-ajudar/parcerias` } };
}

export default async function PartnersPage({ params }: PageProps<"/[lang]/como-ajudar/parcerias">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader
        title={t(partners.title)}
        subtitle={t(partners.subtitle)}
        image={img.parceriaAperto}
        crumbs={[
          { label: t(ui.home), href: href(lang) },
          { label: t(help.title), href: href(lang, "/como-ajudar") },
          { label: t(partners.title) },
        ]}
      />

      <section className="container-site py-14">
        <SectionTitle className="mb-10">{t(partners.typesTitle)}</SectionTitle>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.types.map((p) => (
            <li key={p.title.pt} className="card p-6">
              <Icon name={p.icon} size={38} strokeWidth={1.5} className="text-leaf-700" />
              <h3 className="mt-4 text-lg font-extrabold text-navy-900">{t(p.title)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{t(p.text)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white py-14">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <div>
            <SectionTitle align="left" className="mb-6">
              {t(partners.benefitsTitle)}
            </SectionTitle>
            <ul className="space-y-3.5">
              {partners.benefits.map((b) => (
                <li key={b.pt} className="flex items-center gap-3 text-[16.5px] font-semibold text-navy-900">
                  <CheckCircle size={24} className="shrink-0 text-leaf-600" /> {t(b)}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="mb-6 font-serif text-2xl font-black text-navy-900">{t(partners.formTitle)}</h2>
            <PartnerForm lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
