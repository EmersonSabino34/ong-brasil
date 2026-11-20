import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Heart } from "@/components/icons";
import { NewsCard } from "@/components/news-card";
import { ShareButtons } from "@/components/share-buttons";
import { SectionTitle } from "@/components/ui";
import { donation } from "@/lib/content/donation";
import { getNews, news } from "@/lib/content/news";
import { newsPage } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { formatDate, hasLocale, href, translator } from "@/lib/i18n";

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/noticias/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const item = getNews(slug);
  if (!hasLocale(lang) || !item) return {};
  return {
    title: item.title[lang],
    description: item.excerpt[lang],
    alternates: { canonical: `/${lang}/noticias/${slug}` },
    openGraph: { type: "article", publishedTime: item.date, images: [{ url: item.image.src }] },
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/[lang]/noticias/[slug]">) {
  const { lang, slug } = await params;
  const item = getNews(slug);
  if (!hasLocale(lang) || !item) notFound();
  const t = translator(lang);
  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-navy-800 text-white">
          <div className="container-site max-w-4xl pb-10 pt-10 sm:pt-14">
            <Link href={href(lang, "/noticias")} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-gold-300">
              <ArrowLeft size={16} /> {t(newsPage.all)}
            </Link>
            <p className="mb-3 flex flex-wrap items-center gap-3 text-sm font-bold">
              <span className="rounded-full bg-gold-400 px-3 py-1 text-navy-900">{t(item.category)}</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Calendar size={16} /> <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
              </span>
            </p>
            <h1 className="font-serif text-3xl font-black leading-tight sm:text-[2.6rem]">{t(item.title)}</h1>
            <p className="mt-4 text-lg text-white/85 sm:text-xl">{t(item.excerpt)}</p>
          </div>
        </header>

        <div className="container-site max-w-4xl">
          <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-b-2xl shadow-xl sm:rounded-2xl">
            <Image src={item.image} alt="" fill preload sizes="(min-width: 896px) 896px, 100vw" quality={85} placeholder="blur" className="object-cover" />
          </div>
          <div className="prose-ong mx-auto max-w-3xl py-10 text-[18px]">
            {item.body.map((p, i) => (
              <p key={i}>{t(p)}</p>
            ))}
          </div>

          <div className="mx-auto mb-14 flex max-w-3xl flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-wider text-muted">{t(newsPage.share)}</p>
              <ShareButtons
                path={`/${lang}/noticias/${item.slug}`}
                text={t(item.title)}
                labels={{ copy: t({ pt: "Copiar link", fr: "Copier le lien", nl: "Link kopiëren" }), copied: t(donation.copied), share: t(newsPage.share) }}
              />
            </div>
            <Link href={href(lang, "/doe")} className="btn-gold shrink-0 px-6 py-3">
              {t(ui.donate)} <Heart size={18} />
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-white py-14">
        <div className="container-site">
          <SectionTitle className="mb-8">{t(newsPage.related)}</SectionTitle>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((n) => (
              <li key={n.slug}>
                <NewsCard lang={lang} item={n} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
