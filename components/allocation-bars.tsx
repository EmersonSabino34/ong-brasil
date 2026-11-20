import type { Locale } from "@/lib/i18n";
import { transparency } from "@/lib/content/pages";

/**
 * Aplicação dos recursos: barras horizontais ordenadas (uma cor só), nome + percentual em texto.
 * Passar o mouse/foco destaca a barra e mostra o detalhe.
 */
export function AllocationBars({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const rows = [...transparency.allocation].sort((a, b) => b.pct - a.pct);
  return (
    <ul className="space-y-4" role="list">
      {rows.map((row) => (
        <li key={row.label.pt} tabIndex={0} className="group relative rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className={`font-bold text-navy-900 ${compact ? "text-[14.5px]" : "text-[15.5px]"}`}>{row.label[lang]}</span>
            <span className={`font-black tabular-nums text-navy-900 ${compact ? "text-[15px]" : "text-lg"}`}>{row.pct}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-r bg-navy-100/70" aria-hidden="true">
            <div
              className="h-full rounded-r-[4px] bg-navy-700 transition-colors group-hover:bg-navy-600 group-focus-visible:bg-navy-600"
              style={{ width: `${row.pct}%` }}
            />
          </div>
          {compact ? null : <p className="mt-1.5 text-sm text-muted">{row.detail[lang]}</p>}
          {/* Dica ao passar o mouse */}
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-2 right-0 z-10 -translate-y-full rounded-lg bg-navy-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {row.label[lang]}: {row.pct}% — {row.detail[lang]}
          </span>
        </li>
      ))}
    </ul>
  );
}
