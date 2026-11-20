import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AllocationBars } from "@/components/allocation-bars";
import { Download, FileText, Mail, ShieldCheck } from "@/components/icons";
import { PageHeader, SectionTitle } from "@/components/ui";
import { transparency as tp } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/transparencia">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: tp.title[lang], description: tp.subtitle[lang], alternates: { canonical: `/${lang}/transparencia` } };
}

export default async function TransparencyPage({ params }: PageProps<"/[lang]/transparencia">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);
  const requestHref = `${href(lang, "/contato")}?assunto=transparencia`;

  const DocAction = ({ file }: { file: string }) =>
    file ? (
      <a href={file} download className="btn-navy shrink-0 px-4 py-2.5 text-sm">
        <Download size={16} /> {t(tp.download)}
      </a>
    ) : (
      <Link href={requestHref} className="btn shrink-0 border-2 border-line bg-white px-4 py-2 text-sm text-navy-900 hover:border-navy-600">
        <Mail size={16} /> {t(tp.request)}
      </Link>
    );

  return (
    <>
      <PageHeader
        title={t(tp.title)}
        subtitle={t(tp.subtitle)}
        image={img.palestra}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(tp.title) }]}
      />

      <section id="recursos" className="container-site grid gap-10 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="card p-6 sm:p-8">
          <SectionTitle align="left" className="mb-2">
            {t(tp.resourcesTitle)}
          </SectionTitle>
          <p className="mb-8 text-[15px] text-muted">{t(tp.resourcesNote)}</p>
          <AllocationBars lang={lang} />
        </div>

        <div>
          <h2 className="mb-5 font-serif text-2xl font-black text-navy-900">{t(tp.indicatorsTitle)}</h2>
          <ul className="grid grid-cols-2 gap-4">
            {tp.indicators.map((i) => (
              <li key={i.value} className="rounded-2xl bg-navy-800 p-5 text-white">
                <p className="font-serif text-3xl font-black text-gold-400">{i.value}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-white/85">{t(i.label)}</p>
              </li>
            ))}
          </ul>
          <h2 className="mb-4 mt-9 font-serif text-2xl font-black text-navy-900">{t(tp.commitTitle)}</h2>
          <ul className="space-y-3">
            {tp.commitments.map((c) => (
              <li key={c.pt} className="flex items-center gap-3 font-semibold text-navy-900">
                <ShieldCheck size={22} className="shrink-0 text-leaf-600" /> {t(c)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="relatorios" className="bg-white py-14">
        <div className="container-site">
          <SectionTitle className="mb-3">{t(tp.reportsTitle)}</SectionTitle>
          <p className="mx-auto mb-9 max-w-2xl text-center text-lg text-ink/85">{t(tp.reportsIntro)}</p>
          <ul className="grid gap-5 md:grid-cols-3">
            {tp.reports.map((r) => (
              <li key={r.year} className="flex flex-col rounded-2xl bg-cream p-6 ring-1 ring-black/5">
                <span className="font-serif text-4xl font-black text-gold-600">{r.year}</span>
                <h3 className="mb-5 mt-1 flex-1 text-lg font-extrabold text-navy-900">{t(r.title)}</h3>
                <DocAction file={r.file} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="documentos" className="container-site py-14">
        <SectionTitle className="mb-9">{t(tp.docsTitle)}</SectionTitle>
        <ul className="card mx-auto max-w-3xl divide-y divide-line">
          {tp.docs.map((doc) => (
            <li key={doc.title.pt} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
              <span className="flex items-center gap-3 font-bold text-navy-900">
                <FileText size={24} className="shrink-0 text-navy-600" /> {t(doc.title)}
              </span>
              <DocAction file={doc.file} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
