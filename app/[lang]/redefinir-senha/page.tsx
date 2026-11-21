import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ResetForm } from "@/components/auth/auth-forms";
import { AuthShell, FormSkeleton } from "@/components/auth/auth-shell";
import { Info, KeyRound } from "@/components/icons";
import { findUserByResetToken } from "@/lib/auth/users";
import { auth } from "@/lib/content/auth";
import { hasLocale, href, translator, type Locale } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/redefinir-senha">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: auth.reset.title[lang], robots: { index: false, follow: false }, referrer: "no-referrer" };
}

/** Confere o link antes de mostrar o formulário (lê ?token=, por isso fica dentro do Suspense). */
async function ResetContent({ lang, searchParams }: { lang: Locale; searchParams: PageProps<"/[lang]/redefinir-senha">["searchParams"] }) {
  const raw = (await searchParams).token;
  await connection(); // a validade do link depende da hora atual: confere só na requisição real
  const token = typeof raw === "string" ? raw.slice(0, 200) : "";
  const valid = token ? await findUserByResetToken(token) : undefined;

  if (!valid) {
    return (
      <div className="space-y-6">
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <Info size={44} strokeWidth={1.6} className="mx-auto text-red-600" />
          <p className="mt-4 text-[17px] font-bold text-navy-900">{auth.reset.invalid[lang]}</p>
          <p className="mt-2 text-sm text-muted">{auth.reset.invalidText[lang]}</p>
        </div>
        <Link href={href(lang, "/esqueci-senha")} className="btn-gold w-full py-3.5 text-[17px]">
          {auth.reset.requestNew[lang]}
        </Link>
      </div>
    );
  }
  return <ResetForm lang={lang} token={token} />;
}

export default async function ResetPasswordPage({ params, searchParams }: PageProps<"/[lang]/redefinir-senha">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <AuthShell
      lang={lang}
      image={img.maosUnidas}
      crumb={t(auth.reset.title)}
      heading={t(auth.reset.title)}
      subtitle={t(auth.reset.subtitle)}
      icon={<KeyRound size={26} strokeWidth={2.2} />}
    >
      <Suspense fallback={<FormSkeleton rows={2} />}>
        <ResetContent lang={lang} searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}
