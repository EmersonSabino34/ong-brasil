import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Icon, type IconName } from "@/components/icons";
import { GoldIcon } from "@/components/ui";

type Props = {
  href: string;
  image: StaticImageData;
  icon: IconName;
  title: string;
  summary: string;
  cta?: string;
  badge?: ReactNode;
};

/** Card de projeto/área no estilo do layout: foto, ícone dourado sobreposto, título e descrição. */
export function ProjectCard({ href, image, icon, title, summary, cta, badge }: Props) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_10px_28px_-18px_rgb(11_42_74/0.45)] ring-1 ring-black/[0.04] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgb(11_42_74/0.5)]"
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          placeholder="blur"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {badge && <div className="absolute left-3 top-3">{badge}</div>}
      </div>
      <div className="grid flex-1 grid-cols-[auto_1fr] gap-x-2.5 px-4 pb-5">
        <GoldIcon className="-mt-5">
          <Icon name={icon} size={22} strokeWidth={2} />
        </GoldIcon>
        <h3 className="self-center pt-1.5 text-[18px] font-extrabold leading-tight text-navy-900">{title}</h3>
        <p className="col-start-2 mt-1.5 text-[15px] leading-snug text-ink/85">{summary}</p>
        {cta && (
          <span className="col-start-2 mt-3 inline-flex items-center gap-1.5 self-end text-sm font-extrabold text-navy-700 group-hover:text-gold-700">
            {cta} <ArrowRight size={16} />
          </span>
        )}
      </div>
    </Link>
  );
}

export function StatusBadge({ children, tone = "leaf" }: { children: ReactNode; tone?: "leaf" | "gold" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black shadow-sm ${
        tone === "leaf" ? "bg-leaf-600 text-white" : "bg-gold-400 text-navy-900"
      }`}
    >
      {children}
    </span>
  );
}
