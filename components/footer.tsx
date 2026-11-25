import Link from "next/link";
import { SocialLinks } from "@/components/header/header";
import { Heart, Mail, Phone, WhatsApp } from "@/components/icons";
import { Logo } from "@/components/logo";
import { auth } from "@/lib/content/auth";
import { footerColumns, navByKey } from "@/lib/content/nav";
import { ui } from "@/lib/content/ui";
import { href, translator, type Locale } from "@/lib/i18n";
import { isPlaceholder, site, whatsappLink } from "@/lib/site";

export function Footer({ lang }: { lang: Locale }) {
  const t = translator(lang);
  const phones = [
    { ...site.phones.portugal, label: ui.phonePT },
    { ...site.phones.brasil, label: ui.phoneBR },
  ].filter((p) => !isPlaceholder(p.tel));
  return (
    <footer className="bg-[linear-gradient(90deg,#082b4f_0%,#0b3a62_100%)] text-white">
      <div className="container-site grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1fr_1.7fr_1.35fr_1fr] lg:gap-0 lg:py-9">
        <div className="flex items-start lg:pr-8">
          <Link href={href(lang)} aria-label={site.name}>
            <Logo variant="light" />
          </Link>
        </div>

        <div className="lg:px-8">
          <h2 className="mb-3 text-[17px] font-extrabold">{t(ui.siteMap)}</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {footerColumns.map((col, i) => (
              <ul key={i} className="space-y-1.5">
                {col.map((key) => {
                  const item = navByKey(key);
                  return (
                    <li key={key}>
                      <Link href={href(lang, item.path)} className="text-[15px] text-white/85 transition hover:text-gold-300">
                        {t(item.label)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        <div className="lg:border-l lg:border-white/20 lg:px-8">
          <h2 className="mb-3 text-[17px] font-extrabold">{t(ui.contact)}</h2>
          <ul className="space-y-2.5 text-[15px] text-white/90">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold-300">
                <Mail size={20} /> {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink(t(ui.whatsappGreeting))} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-300">
                <WhatsApp size={20} /> {site.whatsapp.display} <span className="text-white/65">· {t(ui.whatsapp)}</span>
              </a>
            </li>
            {phones.length > 0 && (
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0" />
                <span className="flex flex-col">
                  {phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-gold-300">
                      {p.display} {t(p.label)}
                    </a>
                  ))}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:border-l lg:border-white/20 lg:pl-8">
          <h2 className="mb-3 text-[17px] font-extrabold">{t(ui.followUs)}</h2>
          <SocialLinks className="mb-5 text-white" size={24} />
          <Link href={href(lang, "/doe")} className="btn-gold-soft px-6 py-3 text-[17px]">
            {t(ui.donate)} <Heart size={19} strokeWidth={2.2} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-4 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {t(ui.rights)}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={href(lang, "/minha-conta")} className="hover:text-gold-300">
              {t(auth.areaName)}
            </Link>
            <Link href={href(lang, "/privacidade")} className="hover:text-gold-300">
              {t(ui.privacy)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
