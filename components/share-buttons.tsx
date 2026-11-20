"use client";

import { useState } from "react";
import { Check, Facebook, LinkIcon, MessageCircle, Share } from "@/components/icons";

type Props = {
  /** Caminho da página (ex.: /pt/noticias/x). Vazio = página atual. */
  path?: string;
  text: string;
  labels: { copy: string; copied: string; share: string };
};

/** Compartilhar: WhatsApp, Facebook, copiar link e o compartilhamento nativo do celular. */
export function ShareButtons({ path, text, labels }: Props) {
  const [copied, setCopied] = useState(false);

  const url = () => (typeof window === "undefined" ? "" : new URL(path ?? window.location.pathname, window.location.origin).toString());

  const open = (target: string) => window.open(target, "_blank", "noopener,noreferrer,width=640,height=560");

  const btn = "inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-navy-900 transition hover:border-navy-600";

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className={btn} onClick={() => open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url()}`)}`)}>
        <MessageCircle size={18} className="text-[#1c9e52]" /> WhatsApp
      </button>
      <button type="button" className={btn} onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)}>
        <Facebook size={18} className="text-[#1877f2]" /> Facebook
      </button>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url());
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } catch {
            /* sem permissão para a área de transferência */
          }
        }}
      >
        {copied ? <Check size={18} className="text-leaf-600" /> : <LinkIcon size={18} />} {copied ? labels.copied : labels.copy}
      </button>
      <button
        type="button"
        className={`${btn} sm:hidden`}
        onClick={() => navigator.share?.({ title: document.title, text, url: url() }).catch(() => {})}
      >
        <Share size={18} /> {labels.share}
      </button>
    </div>
  );
}
