import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { adminSignOut } from "@/app/admin/actions";
import { AdminNav, AdminNavList } from "@/components/admin/nav";
import { PageSkeleton } from "@/components/admin/ui";
import { Globe, LogOut } from "@/components/icons";
import { LogoMark } from "@/components/logo";

/** Moldura do painel: menu lateral + conteúdo. Cada página confere o login (requireAdmin). */
export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="bg-[linear-gradient(180deg,#082b4f_0%,#0b3a62_100%)] text-white lg:min-h-dvh">
        <div className="px-4 py-4 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:px-5 lg:py-7">
          <div className="mb-4 flex items-center justify-between gap-3 lg:mb-8 lg:block">
            <Link href="/admin" aria-label="Painel – visão geral" className="inline-flex items-center gap-2.5">
              <LogoMark variant="light" className="h-10 w-auto shrink-0 lg:h-12" />
              <span className="flex flex-col font-serif text-[1.15rem] font-black leading-none tracking-tight lg:text-[1.4rem]">
                <span>Infinita</span>
                <span>Esperança</span>
              </span>
            </Link>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gold-300 lg:mt-4">Painel da equipe</p>
          </div>
          <Suspense fallback={<AdminNavList pathname="" />}>
            <AdminNav />
          </Suspense>
          <div className="mt-4 flex gap-2 border-t border-white/10 pt-4 lg:mt-auto lg:flex-col">
            <Link href="/pt" target="_blank" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-bold text-white/75 hover:bg-white/10 hover:text-white">
              <Globe size={19} /> Ver o site
            </Link>
            <form action={adminSignOut}>
              <button type="submit" className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-bold text-white/75 hover:bg-white/10 hover:text-white">
                <LogOut size={19} /> Sair
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main id="conteudo" className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
        <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
      </main>
    </div>
  );
}
