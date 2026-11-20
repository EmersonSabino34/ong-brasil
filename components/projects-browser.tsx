"use client";

import type { StaticImageData } from "next/image";
import { useState } from "react";
import type { IconName } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";

export type BrowserProject = {
  slug: string;
  href: string;
  image: StaticImageData;
  icon: IconName;
  title: string;
  summary: string;
  area: string;
};

type Props = {
  projects: BrowserProject[];
  areas: { key: string; label: string }[];
  labels: { all: string; filter: string; cta: string };
};

/** Lista de projetos com filtro por área. */
export function ProjectsBrowser({ projects, areas, labels }: Props) {
  const [area, setArea] = useState("all");
  const visible = area === "all" ? projects : projects.filter((p) => p.area === area);
  const used = areas.filter((a) => projects.some((p) => p.area === a.key));

  return (
    <>
      <div role="group" aria-label={labels.filter} className="mb-7 flex flex-wrap gap-2">
        {[{ key: "all", label: labels.all }, ...used].map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => setArea(a.key)}
            aria-pressed={area === a.key}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
              area === a.key ? "border-navy-700 bg-navy-700 text-white" : "border-line bg-white text-navy-900 hover:border-navy-600"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProjectCard href={p.href} image={p.image} icon={p.icon} title={p.title} summary={p.summary} cta={labels.cta} />
          </li>
        ))}
      </ul>
    </>
  );
}
