"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "@/components/icons";
import { useActiveKey } from "./use-active-key";
import type { MenuItem } from "./types";

/** Menu principal (desktop) com submenus que abrem ao passar o mouse, com foco do teclado ou clique. */
export function MainNav({ items }: { items: MenuItem[] }) {
  const activeKey = useActiveKey();
  const pathname = usePathname();
  // Guarda em qual página o submenu foi aberto: ao trocar de página ele fica fechado automaticamente.
  const [state, setState] = useState<{ key: string; path: string } | null>(null);
  const open = state && state.path === pathname ? state.key : null;
  const setOpen = (value: string | null | ((k: string | null) => string | null)) => {
    setState((prev) => {
      const current = prev && prev.path === pathname ? prev.key : null;
      const next = typeof value === "function" ? value(current) : value;
      return next ? { key: next, path: pathname } : null;
    });
  };
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openNow = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <ul className="flex items-stretch justify-center">
      {items.map((item) => {
        const active = item.key === activeKey;
        const isOpen = open === item.key;
        const hasChildren = !!item.children?.length;
        return (
          <li
            key={item.key}
            className="relative"
            onMouseEnter={() => hasChildren && openNow(item.key)}
            onMouseLeave={() => hasChildren && closeSoon()}
            onFocus={() => hasChildren && openNow(item.key)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen((k) => (k === item.key ? null : k));
            }}
          >
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              aria-haspopup={hasChildren ? "true" : undefined}
              aria-expanded={hasChildren ? isOpen : undefined}
              className={`relative flex h-full items-center gap-1 px-3.5 py-[11px] text-[16.5px] font-semibold text-white/95 transition-colors hover:text-gold-300 2xl:px-5 ${
                active ? "text-white" : ""
              }`}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown size={15} strokeWidth={2.6} className={`mt-0.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              )}
              {active && <span className="absolute inset-x-3.5 bottom-0 h-[3px] rounded-t bg-gold-500 2xl:inset-x-5" />}
            </Link>

            {hasChildren && (
              <div
                className={`absolute left-0 top-full z-50 min-w-64 pt-0 transition duration-150 ${
                  isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <ul className="overflow-hidden rounded-b-xl border-t-[3px] border-gold-500 bg-white py-2 shadow-[0_18px_40px_-12px_rgb(6_28_52/0.35)]">
                  {item.children!.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setOpen(null)}
                        className="block px-5 py-2.5 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-navy-50 hover:text-navy-700 focus-visible:bg-navy-50 focus-visible:outline-none"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
