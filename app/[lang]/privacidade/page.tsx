import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { privacyPage } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidade">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: privacyPage.title[lang], alternates: { canonical: `/${lang}/privacidade` } };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader title={t(privacyPage.title)} crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(privacyPage.title) }]} />
      <section className="container-site max-w-3xl py-14">
        <div className="prose-ong card p-7 text-[17px] sm:p-10">
          {privacyPage.sections.map((s) => (
            <div key={s.h.pt}>
              <h2>{t(s.h)}</h2>
              <p>{t(s.p)}</p>
            </div>
          ))}
          <p>
            <a href={`mailto:${site.email}`} className="font-bold text-navy-700 underline">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
