"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart, Handshake, HandHeart, Heart, MessageCircle, ShieldCheck, Users } from "@/components/icons";


const items = [
  { href: "/admin", label: "Visão geral", Icon: BarChart },
  { href: "/admin/doacoes", label: "Doações", Icon: Heart },
  { href: "/admin/voluntarios", label: "Voluntários", Icon: HandHeart },
  { href: "/admin/parcerias", label: "Parcerias", Icon: Handshake },
  { href: "/admin/mensagens", label: "Mensagens", Icon: MessageCircle },
  { href: "/admin/apoiadores", label: "Apoiadores", Icon: Users },
  { href: "/admin/configuracao", label: "Configuração", Icon: ShieldCheck },
];


/** Menu do painel com a página atual destacada (lê a URL, por isso fica dentro de um <Suspense>). */
export function AdminNav() {
  return <AdminNavList pathname={usePathname()} />;
}

/** Menu do painel: vertical no computador, rolagem horizontal no celular. */
export function AdminNavList({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Menu do painel">
      <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-bold transition ${
                  active ? "bg-white text-navy-900 shadow-sm" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} className={active ? "text-gold-600" : ""} /> {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
