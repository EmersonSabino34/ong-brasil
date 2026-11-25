import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/login-form";
import { Notice } from "@/components/auth/auth-forms";
import { ArrowLeft, Lock } from "@/components/icons";
import { Logo } from "@/components/logo";
import { adminConfig } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Entrar" };

async function Messages({ searchParams }: { searchParams: PageProps<"/admin/entrar">["searchParams"] }) {
  const { saiu } = await searchParams;
  const ready = adminConfig().ready;
  return (
    <>
      {!ready && (
        <div className="mb-5 rounded-xl border border-gold-500/40 bg-gold-50 px-4 py-3 text-[14.5px] font-semibold text-gold-700">
          O login do painel ainda não foi configurado. Defina as variáveis <code>ADMIN_EMAIL</code> e <code>ADMIN_PASSWORD</code>{" "}
          (no arquivo <code>.env.local</code> ou na Vercel) e reinicie o site.
        </div>
      )}
      {saiu === "1" && (
        <div className="mb-5">
          <Notice tone="success">Você saiu do painel.</Notice>
        </div>
      )}
    </>
  );
}

export default function AdminLoginPage({ searchParams }: PageProps<"/admin/entrar">) {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <section className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#082b4f_0%,#0e4470_100%)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo variant="light" />
        <div className="max-w-md">
          <p className="font-script text-3xl text-gold-300">Área da equipe</p>
          <h1 className="mt-2 font-serif text-4xl font-black leading-tight">Painel administrativo da Infinita Esperança</h1>
          <p className="mt-4 text-lg text-white/80">
            Acompanhe doações, voluntários, propostas de parceria e mensagens recebidas pelo site — tudo num só lugar.
          </p>
        </div>
        <p className="text-sm text-white/55">Acesso restrito à equipe da ONG.</p>
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-gold-400/10" aria-hidden="true" />
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="card p-7 sm:p-9">
            <span className="grid size-12 place-items-center rounded-full bg-navy-50 text-navy-700">
              <Lock size={22} />
            </span>
            <h2 className="mt-4 font-serif text-2xl font-black text-navy-900">Entrar no painel</h2>
            <p className="mt-1 mb-6 text-muted">Use o e-mail e a senha de administrador.</p>
            <Suspense>
              <Messages searchParams={searchParams} />
            </Suspense>
            <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-navy-50" aria-hidden="true" />}>
              <AdminLoginForm />
            </Suspense>
          </div>
          <Link href="/pt" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy-700 hover:text-gold-700">
            <ArrowLeft size={16} /> Voltar ao site
          </Link>
        </div>
      </section>
    </main>
  );
}
