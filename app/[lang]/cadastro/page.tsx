import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SignupForm } from "@/components/auth/auth-forms";
import { AuthShell, FormSkeleton } from "@/components/auth/auth-shell";
import { UserPlus } from "@/components/icons";
import { auth } from "@/lib/content/auth";
import { hasLocale, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/cadastro">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: auth.signup.title[lang],
    description: auth.signup.subtitle[lang],
    alternates: { canonical: `/${lang}/cadastro` },
  };
}

export default async function SignupPage({ params }: PageProps<"/[lang]/cadastro">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <AuthShell
      lang={lang}
      image={img.equipeVoluntarios}
      crumb={t(auth.signup.title)}
      heading={t(auth.signup.heading)}
      subtitle={t(auth.signup.subtitle)}
      icon={<UserPlus size={26} strokeWidth={2.2} />}
    >
      <Suspense fallback={<FormSkeleton rows={5} />}>
        <SignupForm lang={lang} />
      </Suspense>
    </AuthShell>
  );
}
