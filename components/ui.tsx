import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "@/components/icons";

/** Título com as linhas douradas dos dois lados ("—— Nossos Projetos ——"). */
export function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
  align = "center",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  align?: "center" | "left";
}) {
  if (align === "left") {
    return (
      <div className={className}>
        <Tag className="font-serif text-[1.75rem] font-black leading-tight tracking-tight text-navy-900 sm:text-[2.2rem]">{children}</Tag>
        <span className="mt-3 block h-0.75 w-14 rounded bg-gold-500" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 ${className}`}>
      <span className="h-0.75 w-10 shrink-0 rounded bg-gold-500 sm:w-14" aria-hidden="true" />
      <Tag className="text-center font-serif text-[1.75rem] font-black leading-tight tracking-tight text-navy-900 sm:text-[2.35rem]">
        {children}
      </Tag>
      <span className="h-0.75 w-10 shrink-0 rounded bg-gold-500 sm:w-14" aria-hidden="true" />
    </div>
  );
}

export type Crumb = { label: string; href?: string };

/** Banner azul no topo das páginas internas, com foto ao fundo e trilha de navegação. */
export function PageHeader({
  title,
  subtitle,
  image,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  image?: StaticImageData;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800 text-white">
      {image && (
        <Image src={image} alt="" fill preload sizes="100vw" placeholder="blur" className="-z-20 object-cover object-center" />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_36_66/0.95)_0%,rgb(9_48_87/0.86)_45%,rgb(14_68_112/0.55)_100%)]" />
      <div className="container-site py-12 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold text-white/75">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold-300">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="max-w-4xl font-serif text-[2rem] font-black leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{subtitle}</p>}
        <span className="mt-6 block h-1 w-16 rounded bg-gold-500" aria-hidden="true" />
      </div>
    </section>
  );
}

/** Ícone dentro de um círculo dourado (como nos cards de projeto). */
export function GoldIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#f7cb4d,#e2a414)] text-navy-900 shadow-[0_4px_10px_-4px_rgb(168_111_4/0.8)] ring-[3px] ring-white ${className}`}
    >
      {children}
    </span>
  );
}

export function formatStat(n: number, lang: string, prefix = "", suffix = "") {
  const locale = lang === "pt" ? "pt-BR" : lang === "fr" ? "fr-BE" : "nl-BE";
  return `${prefix}${new Intl.NumberFormat(locale).format(n)}${suffix}`;
}
