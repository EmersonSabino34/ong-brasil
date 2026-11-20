"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "@/components/icons";

export type GalleryPhoto = { image: StaticImageData; alt: string; category: string; categoryLabel: string };

type Props = {
  photos: GalleryPhoto[];
  categories: { key: string; label: string }[];
  labels: { all: string; photos: string; open: string; close: string; prev: string; next: string };
};

/** Galeria com filtro por categoria e visualização ampliada (setas do teclado, Esc, deslizar no celular). */
export function GalleryGrid({ photos, categories, labels }: Props) {
  const [filter, setFilter] = useState("all");
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const visible = filter === "all" ? photos : photos.filter((p) => p.category === filter);
  const photo = current !== null ? visible[current] : null;

  const openAt = (i: number) => {
    setCurrent(i);
    dialogRef.current?.showModal();
  };
  const go = (delta: number) => setCurrent((c) => (c === null ? c : (c + delta + visible.length) % visible.length));

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, []);

  return (
    <>
      <div role="group" aria-label="Filtro" className="mb-8 flex flex-wrap justify-center gap-2">
        {[{ key: "all", label: labels.all }, ...categories].map((c) => {
          const count = c.key === "all" ? photos.length : photos.filter((p) => p.category === c.key).length;
          const active = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              aria-pressed={active}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                active ? "border-navy-700 bg-navy-700 text-white" : "border-line bg-white text-navy-900 hover:border-navy-600"
              }`}
            >
              {c.label} <span className={active ? "text-white/70" : "text-muted"}>({count})</span>
            </button>
          );
        })}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {visible.map((p, i) => (
          <li key={`${p.image.src}-${i}`} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => openAt(i)}
              aria-label={`${labels.open}: ${p.alt}`}
              className="group relative block w-full overflow-hidden rounded-xl bg-navy-100 shadow-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              <Image
                src={p.image}
                alt={p.alt}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                className="h-auto w-full transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-950/85 to-transparent px-3 pb-2.5 pt-8 text-left text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="mb-0.5 block text-[11px] font-black uppercase tracking-wider text-gold-300">{p.categoryLabel}</span>
                {p.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setCurrent(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        aria-label={photo?.alt}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy-950/90"
      >
        {photo && (
          <div
            className="relative flex h-dvh w-screen flex-col items-center justify-center px-3 py-14 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <figure className="flex max-h-full flex-col items-center">
              <Image
                key={photo.image.src}
                src={photo.image}
                alt={photo.alt}
                sizes="100vw"
                placeholder="blur"
                className="max-h-[calc(100dvh-9rem)] w-auto rounded-lg object-contain shadow-2xl"
                style={{ maxWidth: Math.min(photo.image.width, 1400) }}
              />
              <figcaption className="mt-3 text-center text-[15px] font-semibold text-white">
                <span className="mr-2 text-xs font-black uppercase tracking-wider text-gold-300">{photo.categoryLabel}</span>
                {photo.alt}
                <span className="ml-3 text-white/60 tabular-nums">
                  {current! + 1}/{visible.length}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={24} />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.prev}
              className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
