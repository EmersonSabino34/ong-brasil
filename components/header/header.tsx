import Link from "next/link";

import { FlagBE, FlagBR, FlagPT } from "@/components/flags";

import { Facebook, Heart, Instagram, MapPin, Youtube } from "@/components/icons";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/content/nav";
import { ui } from "@/lib/content/ui";
import { href, translator, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./language-switcher";
import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";
import type { MenuItem } from "./types";

export function SocialLinks({ className = "", size = 22 }: { className?: string; size?: number }) {
  const links = [
    { name: "Instagram", url: site.social.instagram, Icon: Instagram },
    { name: "Facebook", url: site.social.facebook, Icon: Facebook },
    { name: "YouTube", url: site.social.youtube, Icon: Youtube },
  ];
  return (
    <ul className={`flex items-center gap-3.5 ${className}`}>
      {links.map(({ name, url, Icon }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="block transition hover:text-gold-600">
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Header({ lang }: { lang: Locale }) {
  const t = translator(lang);
  const items: MenuItem[] = nav.map((item) => ({
    key: item.key,
    label: t(item.label),
    href: href(lang, item.path),
    children: item.children?.map((c) => ({ label: t(c.label), href: href(lang, c.path) })),
  }));
  const donateHref = href(lang, "/doe");

  return (
    <>
      {/* Faixa branca: logo, frase, países, redes e "Doe Agora" */}
      <div className="sticky top-0 z-40 border-b border-line/70 bg-white xl:static xl:border-0">
        <div className="container-site flex items-center justify-between gap-4 py-2 sm:py-2.5 xl:py-3">
          <div className="flex min-w-0 items-center gap-5 2xl:gap-7">
            <Link href={href(lang)} aria-label={`${site.name} – ${t(ui.home)}`} className="shrink-0">
              <Logo />
            </Link>
            <span className="hidden h-14 w-px bg-navy-900/15 lg:block" aria-hidden="true" />
            <p className="hidden max-w-[245px] text-[15px] leading-[1.35] text-navy-900/90 lg:block">{t(ui.tagline)}</p>
          </div>

          {/* Desktop */}
          <div className="hidden flex-col items-end gap-2.5 xl:flex">
            <div className="flex items-center gap-3.5 text-[14.5px] text-navy-900">
              <span className="flex items-center gap-1.5">
                <MapPin size={18} className="text-navy-900" />
                {t(ui.actingIn)}: <b>{t(ui.countries.br)}</b> (São Paulo)
                <FlagBR title={t(ui.countries.br)} className="ml-1" />
              </span>
              <span className="h-4 w-px bg-navy-900/25" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                {t(ui.expanding)}: <b>{t(ui.countries.pt)}</b>
                <FlagPT title={t(ui.countries.pt)} />
                {t(ui.and)} <b>{t(ui.countries.be)}</b>
                <FlagBE title={t(ui.countries.be)} />
              </span>
              <SocialLinks className="ml-4 text-navy-900" />
              <LanguageSwitcher lang={lang} label={t(ui.language)} />
            </div>
            <Link href={donateHref} className="btn-gold px-8 py-3 text-[19px]">
              {t(ui.donate)} <Heart size={20} strokeWidth={2.2} />
            </Link>
          </div>

          {/* Celular / tablet */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2.5 xl:hidden">
            <div className="hidden sm:block">
              <LanguageSwitcher lang={lang} label={t(ui.language)} />
            </div>
            <Link href={donateHref} className="btn-gold whitespace-nowrap px-3 py-2.5 text-[14px] sm:px-5 sm:text-[15px]">
              {t(ui.donate)} <Heart size={17} strokeWidth={2.2} className="hidden sm:block" />
            </Link>
            <MobileMenu
              lang={lang}
              items={items}
              donateHref={donateHref}
              labels={{
                open: t(ui.openMenu),
                close: t(ui.closeMenu),
                donate: t(ui.donate),
                language: t(ui.language),
                home: t(ui.home),
              }}
            />
          </div>
        </div>
      </div>

      {/* Faixa azul do menu (fixa ao rolar) */}
      <nav aria-label="Menu" className="sticky top-0 z-40 hidden bg-navy-700 shadow-[0_6px_18px_-10px_rgb(6_28_52/0.6)] xl:block">
        <div className="container-site">
          <MainNav items={items} />
        </div>
      </nav>
    </>
  );
}
