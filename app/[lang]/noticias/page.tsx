import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar } from "@/components/icons";
import { NewsCard } from "@/components/news-card";
import { PageHeader } from "@/components/ui";
import { news } from "@/lib/content/news";
import { newsPage } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { formatDate, hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/noticias">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: newsPage.title[lang], description: newsPage.subtitle[lang], alternates: { canonical: `/${lang}/noticias` } };
}

export default async function NewsPage({ params }: PageProps<"/[lang]/noticias">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);
  const [first, ...rest] = news;

  return (
    <>
      <PageHeader
        title={t(newsPage.title)}
        subtitle={t(newsPage.subtitle)}
        image={img.criancasSorrindo}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(newsPage.title) }]}
      />

      <section className="container-site py-14">
        <Link
          href={href(lang, `/noticias/${first.slug}`)}
          className="group mb-10 grid overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_-24px_rgb(11_42_74/0.5)] ring-1 ring-black/5 lg:grid-cols-2"
        >
          <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
            <Image src={first.image} alt="" fill preload sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="mb-3 flex flex-wrap items-center gap-3 text-sm font-bold">
              <span className="rounded-full bg-gold-400 px-3 py-1 text-navy-900">{t(newsPage.latest)}</span>
              <span className="text-gold-700">{t(first.category)}</span>
              <span className="flex items-center gap-1.5 text-muted">
                <Calendar size={16} /> <time dateTime={first.date}>{formatDate(first.date, lang)}</time>
              </span>
            </p>
            <h2 className="font-serif text-2xl font-black leading-tight text-navy-900 sm:text-3xl">{t(first.title)}</h2>
            <p className="mt-3 text-lg text-ink/85">{t(first.excerpt)}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-extrabold text-navy-700 group-hover:text-gold-700">
              {t(ui.readMore)} <ArrowRight size={18} />
            </span>
          </div>
        </Link>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <li key={n.slug}>
              <NewsCard lang={lang} item={n} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
