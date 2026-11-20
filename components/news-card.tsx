import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { NewsItem } from "@/lib/content/news";
import { ui } from "@/lib/content/ui";
import { formatDate, href, translator, type Locale } from "@/lib/i18n";

export function NewsCard({ lang, item }: { lang: Locale; item: NewsItem }) {
  const t = translator(lang);
  return (
    <Link
      href={href(lang, `/noticias/${item.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_-18px_rgb(11_42_74/0.45)] ring-1 ring-black/5 transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 flex flex-wrap items-center gap-3 text-[13px] font-bold">
          <span className="text-gold-700">{t(item.category)}</span>
          <time dateTime={item.date} className="text-muted">
            {formatDate(item.date, lang)}
          </time>
        </p>
        <h3 className="font-serif text-lg font-black leading-snug text-navy-900">{t(item.title)}</h3>
        <p className="mt-2 flex-1 text-[15px] text-ink/85">{t(item.excerpt)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-navy-700 group-hover:text-gold-700">
          {t(ui.readMore)} <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
