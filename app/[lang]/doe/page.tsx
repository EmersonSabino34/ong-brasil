import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AllocationBars } from "@/components/allocation-bars";
import { DonationForm } from "@/components/forms/donation-form";
import { ArrowRight, Icon, Mail } from "@/components/icons";
import { PageHeader } from "@/components/ui";
import { areas } from "@/lib/content/areas";
import { donation } from "@/lib/content/donation";
import { help, transparency } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/doe">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: donation.metaTitle[lang], description: donation.subtitle[lang], alternates: { canonical: `/${lang}/doe` } };
}

function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="mx-auto h-12 w-3/4 rounded-xl bg-navy-50" />
      <div className="h-12 rounded-xl bg-navy-50" />
      <div className="grid grid-cols-4 gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-navy-50" />
        ))}
      </div>
      <div className="h-12 rounded-xl bg-navy-50" />
    </div>
  );
}

export default async function DonatePage({ params }: PageProps<"/[lang]/doe">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);
  const otherWays = help.ways.filter((w) => !w.path.startsWith("/doe"));

  return (
    <>
      <PageHeader
        title={t(donation.metaTitle)}
        subtitle={t(donation.subtitle)}
        image={img.doacaoMaos}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(help.title), href: href(lang, "/como-ajudar") }, { label: t(donation.metaTitle) }]}
      />

      <section className="container-site grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="card p-5 sm:p-8">
          <Suspense fallback={<FormSkeleton />}>
            <DonationForm lang={lang} areas={areas.map((a) => ({ value: a.slug, label: t(a.title) }))} />
          </Suspense>
        </div>

        <aside className="space-y-5">
          <div className="card p-6">
            <h2 className="mb-1 font-serif text-xl font-black text-navy-900">{t(donation.whereTitle)}</h2>
            <p className="mb-5 text-sm text-muted">{t(transparency.resourcesNote)}</p>
            <AllocationBars lang={lang} compact />
            <Link href={href(lang, "/transparencia")} className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-navy-700 hover:text-gold-700">
              {t(transparency.title)} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-serif text-xl font-black text-navy-900">{t(donation.otherWays)}</h2>
            <ul className="space-y-1">
              {otherWays.map((w) => (
                <li key={w.path}>
                  <Link
                    href={w.path.startsWith("#") ? `${href(lang, "/como-ajudar")}${w.path}` : href(lang, w.path)}
                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 font-bold text-navy-900 transition hover:bg-navy-50"
                  >
                    <Icon name={w.icon} size={22} className="text-gold-600" /> {t(w.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl bg-navy-800 p-5 font-semibold text-white hover:bg-navy-700">
            <Mail size={22} className="text-gold-400" /> {site.email}
          </a>
        </aside>
      </section>
    </>
  );
}
