import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CheckCircle, ChevronRight, ShieldCheck } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { auth } from "@/lib/content/auth";
import { ui } from "@/lib/content/ui";
import { href, translator, type Locale } from "@/lib/i18n";

type Props = {
  lang: Locale;
  image: StaticImageData;
  /** Nome da página na trilha de navegação. */
  crumb: string;
  heading: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
};

/**
 * Moldura das páginas de conta: foto com os benefícios à esquerda (telas grandes)
 * e o formulário num cartão branco à direita.
 */
export function AuthShell({ lang, image, crumb, heading, subtitle, icon, children }: Props) {
  const t = translator(lang);
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#e2ebf5_0%,#f7f7f3_55%)] py-8 sm:py-12 lg:py-16">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mx-auto mb-5 max-w-6xl">
          <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold text-navy-900/70">
            <li>
              <Link href={href(lang)} className="hover:text-gold-700">
                {t(ui.home)}
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page" className="text-navy-900">
                {crumb}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-35px_rgb(11_42_74/0.55)] ring-1 ring-black/5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Lado da foto */}
          <aside className="relative isolate hidden flex-col overflow-hidden p-10 text-white lg:flex xl:p-12">
            <Image src={image} alt="" fill sizes="(min-width: 1536px) 640px, 45vw" placeholder="blur" className="-z-20 object-cover" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(165deg,rgb(8_36_66/0.96)_0%,rgb(9_48_87/0.86)_50%,rgb(14_68_112/0.62)_100%)]" />

            <LogoMark variant="light" gradientId="gold-auth-aside" className="w-16" />
            <p className="mt-8 text-[13px] font-black uppercase tracking-[0.2em] text-gold-300">{t(auth.areaName)}</p>
            <h2 className="mt-3 font-serif text-[2rem] font-black leading-tight">{t(auth.aside.title)}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{t(auth.aside.text)}</p>
            <span className="mt-6 block h-1 w-14 rounded bg-gold-500" aria-hidden="true" />

            <ul className="mt-8 space-y-4">
              {auth.aside.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[16px] leading-snug text-white/95">
                  {i === auth.aside.benefits.length - 1 ? (
                    <ShieldCheck size={22} className="mt-px shrink-0 text-gold-300" />
                  ) : (
                    <CheckCircle size={22} className="mt-px shrink-0 text-gold-300" />
                  )}
                  {t(b)}
                </li>
              ))}
            </ul>

            <p className="mt-auto pt-12 font-script text-[2.4rem] leading-none text-gold-300 drop-shadow-[0_2px_6px_rgb(0_0_0/0.35)]">
              {t(auth.aside.quote)}
            </p>
          </aside>

          {/* Lado do formulário */}
          <div className="px-5 py-8 sm:px-10 sm:py-10 xl:px-14 xl:py-12">
            <div className="mx-auto max-w-130">
              <span className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(180deg,#f7cb4d,#e2a414)] text-navy-900 shadow-[0_8px_18px_-8px_rgb(168_111_4/0.8)]">
                {icon}
              </span>
              <h1 className="mt-5 font-serif text-[1.9rem] font-black leading-tight tracking-tight text-navy-900 sm:text-[2.2rem]">{heading}</h1>
              <p className="mt-2 text-[16.5px] leading-relaxed text-muted">{subtitle}</p>
              <div className="mt-7">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Esqueleto mostrado enquanto o formulário carrega. */
export function FormSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="h-12 rounded-2xl bg-navy-50" />
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-28 rounded bg-navy-50" />
          <div className="h-12 rounded-xl bg-navy-50" />
        </div>
      ))}
      <div className="h-13 rounded-[10px] bg-navy-50" />
    </div>
  );
}
