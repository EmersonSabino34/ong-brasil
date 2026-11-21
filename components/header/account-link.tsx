import Link from "next/link";
import { User } from "@/components/icons";
import { getCurrentUser } from "@/lib/auth/current-user";
import { auth } from "@/lib/content/auth";
import { href, type Locale } from "@/lib/i18n";

type Variant = "desktop" | "mobile";

/** Botão da conta no cabeçalho: "Entrar" para visitantes, "Olá, Maria" para quem está conectado. */
export function AccountLinkView({ lang, variant, firstName }: { lang: Locale; variant: Variant; firstName: string | null }) {
  const signedIn = firstName !== null;
  const target = href(lang, signedIn ? "/minha-conta" : "/entrar");
  const label = signedIn ? `${auth.hello[lang]}, ${firstName}` : auth.signIn[lang];
  const avatar = signedIn ? (
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#f7cb4d,#e2a414)] text-[13px] font-black text-navy-900">
      {firstName.charAt(0).toUpperCase()}
    </span>
  ) : (
    <User size={20} strokeWidth={2.1} />
  );

  if (variant === "mobile") {
    return (
      <Link
        href={target}
        aria-label={signedIn ? `${auth.myAccount[lang]} (${firstName})` : auth.signIn[lang]}
        className="grid size-10 place-items-center rounded-full text-navy-900 transition hover:bg-navy-50 sm:size-11"
      >
        {avatar}
      </Link>
    );
  }

  return (
    <Link
      href={target}
      title={signedIn ? auth.myAccount[lang] : undefined}
      className="btn max-w-60 border-2 border-navy-700/15 bg-white px-5 py-[11px] text-[17px] text-navy-900 hover:border-navy-700/40 hover:bg-navy-50"
    >
      {avatar}
      <span className="truncate">{label}</span>
    </Link>
  );
}

/** Lê a sessão (cookie), por isso o cabeçalho a coloca dentro de um <Suspense>. */
export async function AccountLink({ lang, variant }: { lang: Locale; variant: Variant }) {
  const user = await getCurrentUser();
  return <AccountLinkView lang={lang} variant={variant} firstName={user?.firstName ?? null} />;
}
