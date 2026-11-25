import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialLinks } from "@/components/header/header";
import { ChevronDown, Clock, Mail, MapPin, Phone, WhatsApp } from "@/components/icons";
import { PageHeader, SectionTitle } from "@/components/ui";
import { contactPage as cp } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";
import { isPlaceholder, site, whatsappLink } from "@/lib/site";

const phone = { pt: "Telefone", fr: "Téléphone", nl: "Telefoon" };

export async function generateMetadata({ params }: PageProps<"/[lang]/contato">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: cp.title[lang], description: cp.subtitle[lang], alternates: { canonical: `/${lang}/contato` } };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contato">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  const channels = [
    { Icon: Mail, label: "E-mail", value: site.email, link: `mailto:${site.email}` },
    { Icon: WhatsApp, label: `${t(ui.whatsapp)} ${t(ui.phoneBE)}`, value: site.whatsapp.display, link: whatsappLink(t(ui.whatsappGreeting)) },
    ...[
      { phone: site.phones.portugal, country: ui.phonePT },
      { phone: site.phones.brasil, country: ui.phoneBR },
    ]
      .filter(({ phone: p }) => !isPlaceholder(p.tel))
      .map(({ phone: p, country }) => ({ Icon: Phone, label: `${t(phone)} ${t(country)}`, value: p.display, link: `tel:${p.tel}` })),
    { Icon: MapPin, label: t(cp.address), value: site.address.street },
    { Icon: Clock, label: t(cp.hours), value: t(cp.hoursText) },
  ];

  return (
    <>
      <PageHeader
        title={t(cp.title)}
        subtitle={t(cp.subtitle)}
        image={img.maosUnidas}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(cp.title) }]}
      />

      <section className="container-site grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
        <div className="card p-6 sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-black text-navy-900">{t(cp.formTitle)}</h2>
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-navy-50" aria-hidden="true" />}>
            <ContactForm lang={lang} />
          </Suspense>
        </div>

        <aside className="space-y-5">
          <div className="card p-6">
            <h2 className="mb-5 font-serif text-xl font-black text-navy-900">{t(cp.infoTitle)}</h2>
            <ul className="space-y-4">
              {channels.map(({ Icon, label, value, link }) => (
                <li key={label} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-wider text-muted">{label}</p>
                    {link ? (
                      <a
                        href={link}
                        {...(link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="wrap-break-word font-bold text-navy-900 hover:text-gold-700"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-bold text-navy-900">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(t(ui.whatsappGreeting))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 w-full bg-[#1c9e52] py-3 text-white hover:bg-[#178745]"
            >
              <WhatsApp size={20} /> {t(cp.whatsapp)}
            </a>
            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-3 text-xs font-black uppercase tracking-wider text-muted">{t(ui.followUs)}</p>
              <SocialLinks className="text-navy-900" size={26} />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
            <iframe
              title={t(cp.address)}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </section>

      <section className="bg-white py-14">
        <div className="container-site max-w-3xl">
          <SectionTitle className="mb-8">{t(cp.faqTitle)}</SectionTitle>
          <div className="space-y-3">
            {cp.faq.map((f) => (
              <details key={f.q.pt} className="group rounded-2xl bg-cream ring-1 ring-black/5 open:bg-white open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[17px] font-extrabold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {t(f.q)}
                  <ChevronDown size={22} className="shrink-0 text-gold-600 transition group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-5 text-[15.5px] leading-relaxed text-ink/85">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
