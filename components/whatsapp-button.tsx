import { WhatsApp } from "@/components/icons";
import { ui } from "@/lib/content/ui";
import type { Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

/** Botão redondo do WhatsApp, fixo no canto da tela em todas as páginas do site. */
export function WhatsAppButton({ lang }: { lang: Locale }) {
  return (
    <a
      href={whatsappLink(ui.whatsappGreeting[lang])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.whatsappCta[lang]}
      title={ui.whatsappCta[lang]}
      className="group fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#1c9e52] p-3.5 text-white shadow-[0_10px_25px_-8px_rgb(0_0_0/0.45)] ring-4 ring-white/70 transition hover:bg-[#178745] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:bottom-6 sm:right-6 print:hidden"
    >
      <WhatsApp size={30} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-extrabold transition-all duration-300 group-hover:max-w-60 group-hover:pr-1.5 lg:inline">
        {ui.whatsappCta[lang]}
      </span>
    </a>
  );
}
