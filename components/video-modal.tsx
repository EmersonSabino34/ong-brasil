"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "@/components/icons";

type Slide = { image: StaticImageData; caption: string };

type Props = {
  buttonLabel: string;
  title: string;
  slides: Slide[];
  youtubeId?: string;
  labels: { close: string; play: string; pause: string; prev: string; next: string };
};

const SLIDE_MS = 4500;

/**
 * Botão "Assista ao nosso vídeo".
 * Se houver um vídeo do YouTube configurado (lib/site.ts → youtubeVideoId), ele é exibido.
 * Senão, mostra uma apresentação animada com as fotos da ONG.
 */
export function VideoModal({ buttonLabel, title, slides, youtubeId, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const show = () => {
    setIndex(0);
    setPlaying(true);
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const hide = () => dialogRef.current?.close();

  // Avança os slides automaticamente
  useEffect(() => {
    if (!open || !playing || youtubeId) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [open, playing, index, slides.length, youtubeId]);

  // Teclado: setas trocam o slide, espaço pausa
  useEffect(() => {
    if (!open || youtubeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, slides.length, youtubeId]);

  // Fecha ao sair da página (o Next mantém a página anterior montada em segundo plano)
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, []);

  const slide = slides[index];

  return (
    <>
      <button type="button" onClick={show} className="btn-outline-light px-4 py-2 text-[15px] font-semibold">
        <Play size={16} /> {buttonLabel}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialogRef.current && hide()}
        aria-label={title}
        className="m-auto w-[min(960px,calc(100%-1.5rem))] overflow-hidden rounded-2xl bg-navy-950 p-0 text-white shadow-2xl backdrop:bg-navy-950/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <h2 className="font-serif text-lg font-bold">{title}</h2>
          <button type="button" onClick={hide} aria-label={labels.close} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
            <X size={22} />
          </button>
        </div>

        {open && youtubeId ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        ) : open ? (
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <div key={index} className="absolute inset-0 animate-[kenburns_6s_ease-out_forwards]">
              <Image src={slide.image} alt="" fill sizes="(max-width: 960px) 100vw, 960px" className="object-cover" placeholder="blur" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            <p
              key={`c-${index}`}
              aria-live="polite"
              className="absolute inset-x-0 bottom-14 px-6 text-center font-script text-3xl leading-tight text-white drop-shadow-lg sm:bottom-16 sm:text-5xl"
            >
              {slide.caption}
            </p>

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-3">
              <button type="button" onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)} aria-label={labels.prev} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? labels.pause : labels.play} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button type="button" onClick={() => setIndex((i) => (i + 1) % slides.length)} aria-label={labels.next} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <ChevronRight size={20} />
              </button>
              <div className="flex flex-1 gap-1.5" aria-hidden="true">
                {slides.map((_, i) => (
                  <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                    {i < index && <span className="block h-full w-full bg-gold-400" />}
                    {i === index && (
                      <span
                        key={`${index}-${playing}`}
                        className="block h-full w-full origin-left bg-gold-400"
                        style={{ animation: playing ? `progress ${SLIDE_MS}ms linear forwards` : "none", transform: playing ? undefined : "scaleX(0)" }}
                      />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-xs tabular-nums text-white/70">
                {index + 1}/{slides.length}
              </span>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
