"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { ChevronDown, Heart, Menu, User, X } from "@/components/icons";
import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { useActiveKey } from "./use-active-key";
import type { MenuItem } from "./types";

type Props = {
  lang: Locale;
  items: MenuItem[];
  labels: { open: string; close: string; donate: string; language: string; home: string; account: string };
  donateHref: string;
};

/** Menu lateral para celular e tablet. */
export function MobileMenu({ lang, items, labels, donateHref }: Props) {
  const pathname = usePathname();
  const activeKey = useActiveKey();
  // O menu fica aberto só na página em que foi aberto (fecha sozinho ao navegar)
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => setOpenAt(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useLayoutEffect(() => () => setOpenAt(null), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenAt(pathname)}
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="grid size-10 place-items-center rounded-full text-navy-900 transition hover:bg-navy-50 sm:size-11"
      >
        <Menu size={26} />
      </button>

      <div
        className={`fixed inset-0 z-60 bg-navy-950/60 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-70 flex w-[min(24rem,100%)] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <Link href={`/${lang}`} onClick={close} aria-label={labels.home}>
            <Logo className="scale-90 origin-left" />
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="grid size-11 place-items-center rounded-full text-navy-900 hover:bg-navy-50"
          >
            <X size={26} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul>
            {items.map((item) => {
              const isExpanded = expanded === item.key;
              const active = item.key === activeKey;
              return (
                <li key={item.key} className="border-b border-line/70 last:border-0">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 rounded-lg px-3 py-3.5 text-[17px] font-bold ${active ? "text-gold-700" : "text-navy-900"}`}
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : item.key)}
                        aria-expanded={isExpanded}
                        aria-label={item.label}
                        className="grid size-11 place-items-center rounded-full text-navy-700 hover:bg-navy-50"
                      >
                        <ChevronDown size={20} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    ) : null}
                  </div>
                  {item.children?.length && isExpanded ? (
                    <ul className="mb-2 ml-3 border-l-2 border-gold-500/70 pl-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-navy-900/85 hover:bg-navy-50"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-line p-4">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted">{labels.language}</p>
            <LanguageSwitcher lang={lang} label={labels.language} variant="list" />
          </div>
          <Link
            href={`/${lang}/minha-conta`}
            onClick={close}
            className="btn w-full border-2 border-navy-700/15 py-3 text-[17px] text-navy-900 hover:border-navy-700/40 hover:bg-navy-50"
          >
            <User size={20} /> {labels.account}
          </Link>
          <Link href={donateHref} onClick={close} className="btn-gold w-full py-3.5 text-lg">
            {labels.donate} <Heart size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}
