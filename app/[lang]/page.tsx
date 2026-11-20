import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlagBE, FlagBR, FlagPT } from "@/components/flags";
import { ArrowRight, Globe, Icon } from "@/components/icons";
import { GoldIcon, SectionTitle } from "@/components/ui";
import { VideoModal } from "@/components/video-modal";
import { areas } from "@/lib/content/areas";
import { home } from "@/lib/content/home";
import { featuredProjects } from "@/lib/content/projects";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: { absolute: home.metaTitle[lang] }, alternates: { canonical: `/${lang}` } };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  const slides = [
    { image: img.hero, caption: t(home.quote) },
    ...areas.map((a) => ({ image: a.image, caption: t(a.short) })),
    { image: img.maosUnidas, caption: t(home.video.final) },
  ];

  const presence = [
    { Flag: FlagBR, name: `${t(ui.countries.br)} – São Paulo`, text: t(home.presence.br) },
    { Flag: FlagPT, name: t(ui.countries.pt), text: t(home.presence.pt) },
    { Flag: FlagBE, name: t(ui.countries.be), text: t(home.presence.be) },
  ];

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Image
          src={img.hero}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={85}
          placeholder="blur"
          className="-z-20 object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(14_24_18/0.82)_0%,rgb(20_28_20/0.6)_30%,rgb(20_28_20/0.08)_55%,transparent_100%)] max-md:bg-[linear-gradient(180deg,rgb(8_20_30/0.35)_0%,rgb(8_20_30/0.82)_70%)]" />

        <div className="container-site relative flex min-h-[460px] items-end pb-20 pt-24 md:min-h-[340px] md:items-center md:pb-14 md:pt-6 xl:min-h-[345px]">
          <div className="max-w-[500px]">
            <h1 className="font-serif text-[3rem] font-black leading-[0.98] tracking-tight drop-shadow-[0_2px_8px_rgb(0_0_0/0.35)] sm:text-[3.4rem] xl:text-[3.6rem]">
              <span className="block text-white">Infinita</span>
              <span className="block text-gold-400">Esperança</span>
            </h1>
            <p className="mt-3 max-w-[330px] text-[17px] leading-[1.3] text-white drop-shadow-[0_1px_4px_rgb(0_0_0/0.5)] sm:text-[17.5px]">{t(home.heroText)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={href(lang, "/projetos")} className="btn-gold-soft px-4 py-2.5 text-[15px]">
                {t(home.ctaProjects)} <ArrowRight size={18} />
              </Link>
              <VideoModal
                buttonLabel={t(home.ctaVideo)}
                title={t(home.video.title)}
                slides={slides}
                youtubeId={site.youtubeVideoId || undefined}
                labels={{
                  close: t(ui.close),
                  play: t(home.video.play),
                  pause: t(home.video.pause),
                  prev: t(home.video.prev),
                  next: t(home.video.next),
                }}
              />
            </div>
          </div>

          {/* Frase manuscrita à direita */}
          <figure className="pointer-events-none absolute right-6 top-1/2 hidden w-[205px] -translate-y-[56%] -rotate-[11deg] lg:block xl:right-10 xl:w-[215px]">
            <blockquote className="font-script text-[2.45rem] leading-[1.05] text-white drop-shadow-[0_2px_6px_rgb(0_0_0/0.45)] xl:text-[2.7rem]">
              {t(home.quote)}
            </blockquote>
            <svg viewBox="0 0 200 40" className="ml-12 mt-1 h-9 w-48 text-gold-400" aria-hidden="true">
              <path d="M4 30c40-6 90-14 150-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              <path
                d="M171 22c-8-7-10-15-3-18 4-2 8 1 9 5 2-4 7-6 10-3 5 5-4 14-16 16Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
            </svg>
          </figure>
        </div>
      </section>

      {/* ===== Faixa com as 6 áreas ===== */}
      <section aria-label={t({ pt: "Áreas de atuação", fr: "Domaines d’action", nl: "Actiedomeinen" })} className="relative z-10 -mt-12">
        <div className="container-site">
          <ul className="card grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
            {areas.map((a) => (
              <li key={a.slug} className="flex">
                <Link
                  href={href(lang, `/o-que-fazemos/${a.slug}`)}
                  className="group flex flex-1 items-center gap-3 rounded-2xl px-4 py-4 transition hover:bg-navy-50 sm:px-5 lg:justify-center lg:py-5"
                >
                  <Icon name={a.icon} size={38} strokeWidth={1.5} className="shrink-0 text-navy-900 transition group-hover:text-gold-600" />
                  <span className="text-[15px] font-extrabold leading-tight text-navy-900">{t(a.title)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Nossos Projetos + Nossa Atuação ===== */}
      <section className="container-site pt-10 pb-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-4">
          <div>
            <SectionTitle className="mb-6">{t(home.projectsTitle)}</SectionTitle>
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={href(lang, `/projetos/${p.slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_10px_28px_-18px_rgb(11_42_74/0.45)] ring-1 ring-black/[0.04] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgb(11_42_74/0.5)]"
                  >
                    <div className="relative aspect-[2.15/1] overflow-hidden">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
                        quality={85}
                        placeholder="blur"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 px-3 pb-4">
                      <GoldIcon className="-mt-5">
                        <Icon name={p.icon} size={22} strokeWidth={2} />
                      </GoldIcon>
                      <h3 className="self-center pt-1.5 text-[16.5px] font-extrabold leading-tight text-navy-900">{t(p.title)}</h3>
                      <p className="col-start-2 mt-1 text-[14px] leading-snug text-ink/85">{t(p.summary)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-center">
              <Link href={href(lang, "/projetos")} className="btn-outline-gold px-10 py-2.5 text-[16px]">
                {t(home.seeAllProjects)} <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-2xl bg-[#eef1f4] p-5 ring-1 ring-black/[0.03] lg:mt-1">
            <div
              className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgb(11_42_74/0.09)_1.2px,transparent_1.2px)] [background-size:10px_10px] [mask-image:linear-gradient(160deg,black,transparent_75%)]"
              aria-hidden="true"
            />
            <h2 className="relative mb-5 flex items-center gap-2.5 font-serif text-[1.45rem] font-black text-navy-900">
              <Globe size={28} strokeWidth={1.6} /> {t(home.presenceTitle)}
            </h2>
            <ul className="relative space-y-5">
              {presence.map(({ Flag, name, text }) => (
                <li key={name} className="flex items-start gap-4">
                  <Flag className="!h-9 !w-[54px] rounded-[3px] shadow-sm" />
                  <div>
                    <p className="text-[16px] font-extrabold text-navy-900">{name}</p>
                    <p className="text-[13.5px] leading-snug text-ink/85">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href={href(lang, "/quem-somos#atuacao")} className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-gold-700">
              {t(ui.learnMore)} <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>

      {/* ===== Faixa: História / Doador / Voluntário / Parcerias ===== */}
      <section className="container-site pb-10">
        <ul className="card grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {home.strip.map((s) => (
            <li key={s.path} className="flex">
              <Link href={href(lang, s.path)} className="group flex flex-1 items-start gap-4 rounded-2xl px-6 py-5 transition hover:bg-navy-50 lg:justify-center">
                <Icon
                  name={s.icon}
                  size={44}
                  strokeWidth={1.5}
                  className={`shrink-0 transition group-hover:scale-110 ${s.color === "leaf" ? "text-leaf-700" : "text-navy-900"}`}
                />
                <span>
                  <span className="block text-[17px] font-extrabold text-navy-900">{t(s.title)}</span>
                  <span className="mt-0.5 block max-w-[230px] text-[14px] leading-snug text-ink/85">{t(s.text)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
