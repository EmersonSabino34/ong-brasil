import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AccountDashboard, AccountSkeleton } from "@/components/account/account-dashboard";
import { PageHeader } from "@/components/ui";
import { auth } from "@/lib/content/auth";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/minha-conta">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: auth.myAccount[lang], robots: { index: false, follow: false } };
}

export default async function AccountPage({ params, searchParams }: PageProps<"/[lang]/minha-conta">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader
        title={t(auth.myAccount)}
        subtitle={t(auth.account.subtitle)}
        image={img.criancasAlegria}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(auth.areaName) }]}
      />
      <Suspense fallback={<AccountSkeleton />}>
        <AccountDashboard lang={lang} searchParams={searchParams} />
      </Suspense>
    </>
  );
}
