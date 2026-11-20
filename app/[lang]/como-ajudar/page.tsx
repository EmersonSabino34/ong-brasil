import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Icon, MapPin } from "@/components/icons";
import { ShareButtons } from "@/components/share-buttons";
import { PageHeader, SectionTitle } from "@/components/ui";
import { donation } from "@/lib/content/donation";
import { help, newsPage } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/como-ajudar">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: help.title[lang], description: help.subtitle[lang], alternates: { canonical: `/${lang}/como-ajudar` } };
}

export default async function HelpPage({ params }: PageProps<"/[lang]/como-ajudar">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader
        title={t(help.title)}
        subtitle={t(help.subtitle)}
        image={img.coracaoMaos}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(help.title) }]}
      />

      <section className="container-site py-14">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {help.ways.map((w) => {
            const target = w.path.startsWith("#") ? `${href(lang, "/como-ajudar")}${w.path}` : href(lang, w.path);
            return (
              <li key={w.path}>
                <Link href={target} className="card group flex h-full flex-col p-7 transition hover:-translate-y-0.5 hover:shadow-xl">
                  <span className="grid size-14 place-items-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-300/60 transition group-hover:bg-gold-400 group-hover:text-navy-900">
                    <Icon name={w.icon} size={28} />
                  </span>
                  <h2 className="mt-5 font-serif text-xl font-black text-navy-900">{t(w.title)}</h2>
                  <p className="mt-2 flex-1 text-[15.5px] leading-relaxed text-ink/85">{t(w.text)}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-navy-700 group-hover:text-gold-700">
                    {t(w.cta)} <ArrowRight size={16} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="itens" className="bg-white py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle align="left" className="mb-5">
              {t(help.itemsTitle)}
            </SectionTitle>
            <p className="mb-6 text-lg text-ink/85">{t(help.itemsIntro)}</p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {help.items.map((item) => (
                <li key={item.pt} className="flex items-start gap-2.5 text-[15.5px] font-semibold text-navy-900">
                  <Check size={20} strokeWidth={2.6} className="mt-0.5 shrink-0 text-leaf-600" /> {t(item)}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-cream p-6 ring-1 ring-black/5">
              <h3 className="flex items-center gap-2 font-extrabold text-navy-900">
                <MapPin size={20} className="text-gold-600" /> {t(help.itemsWhere)}
              </h3>
              <p className="mt-2 flex items-start gap-2 text-[15.5px] text-ink/85">
                <Clock size={18} className="mt-0.5 shrink-0 text-muted" /> {t(help.itemsWhereText)}
              </p>
              <Link href={`${href(lang, "/contato")}?assunto=itens`} className="btn-navy mt-5">
                {t(help.itemsCta)} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={img.roupasArara} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" placeholder="blur" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={img.voluntariosCaixas} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" placeholder="blur" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="divulgue" className="container-site py-16">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-navy-800 px-6 py-12 text-center text-white">
          <Icon name="megaphone" size={44} strokeWidth={1.5} className="text-gold-400" />
          <h2 className="font-serif text-2xl font-black sm:text-3xl">{t(help.shareTitle)}</h2>
          <p className="max-w-xl text-white/85">{t(help.shareText)}</p>
          <ShareButtons
            path={`/${lang}`}
            text={t(help.shareMessage)}
            labels={{ copy: t({ pt: "Copiar link", fr: "Copier le lien", nl: "Link kopiëren" }), copied: t(donation.copied), share: t(newsPage.share) }}
          />
        </div>
      </section>
    </>
  );
}
