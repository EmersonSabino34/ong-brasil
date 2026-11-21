import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/auth-forms";
import { AuthShell, FormSkeleton } from "@/components/auth/auth-shell";
import { LogIn } from "@/components/icons";
import { auth } from "@/lib/content/auth";
import { hasLocale, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/entrar">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: auth.login.title[lang],
    description: auth.login.subtitle[lang],
    alternates: { canonical: `/${lang}/entrar` },
    robots: { index: false, follow: true },
  };
}

export default async function LoginPage({ params }: PageProps<"/[lang]/entrar">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <AuthShell
      lang={lang}
      image={img.criancasSorrindo}
      crumb={t(auth.login.title)}
      heading={t(auth.login.heading)}
      subtitle={t(auth.login.subtitle)}
      icon={<LogIn size={26} strokeWidth={2.2} />}
    >
      <Suspense fallback={<FormSkeleton rows={2} />}>
        <LoginForm lang={lang} />
      </Suspense>
    </AuthShell>
  );
}
