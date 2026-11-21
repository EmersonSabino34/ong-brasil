import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForgotForm } from "@/components/auth/auth-forms";
import { AuthShell } from "@/components/auth/auth-shell";
import { KeyRound } from "@/components/icons";
import { auth } from "@/lib/content/auth";
import { hasLocale, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/esqueci-senha">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: auth.forgot.title[lang], robots: { index: false, follow: false } };
}

export default async function ForgotPasswordPage({ params }: PageProps<"/[lang]/esqueci-senha">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <AuthShell
      lang={lang}
      image={img.maosUnidas}
      crumb={t(auth.forgot.title)}
      heading={t(auth.forgot.title)}
      subtitle={t(auth.forgot.subtitle)}
      icon={<KeyRound size={26} strokeWidth={2.2} />}
    >
      <ForgotForm lang={lang} />
    </AuthShell>
  );
}
