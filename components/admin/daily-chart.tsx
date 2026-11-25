/**
 * Colunas "envios por dia" (uma série só, por isso sem legenda: o título diz o que é).
 * Passe o mouse ou use Tab numa coluna para ver o dia e o total; a tabela abaixo traz todos os números.
 */
export type DayCount = { day: string; label: string; total: number };

function niceMax(value: number) {
  if (value <= 4) return 4;
  const step = 10 ** Math.floor(Math.log10(value));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * step >= value) return m * step;
  return 10 * step;
}

export function DailyChart({ data }: { data: DayCount[] }) {
  const max = niceMax(Math.max(0, ...data.map((d) => d.total)));
  const ticks = [max, max / 2, 0];
  const peak = data.reduce((best, d) => (d.total > best.total ? d : best), data[0]);
  const sum = data.reduce((acc, d) => acc + d.total, 0);

  return (
    <figure>
      <div className="relative flex h-56 gap-3">
        {/* Eixo Y */}
        <div className="flex w-6 flex-col justify-between pb-6 text-right text-xs font-semibold tabular-nums text-muted" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="-translate-y-1/2 leading-none last:translate-y-1/2">
              {Number.isInteger(t) ? t : t.toFixed(1)}
            </span>
          ))}
        </div>
        <div className="relative flex-1">
          {/* Linhas de grade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t} className="h-px bg-line" />
            ))}
          </div>
          <ul className="absolute inset-x-0 top-0 bottom-6 flex items-end gap-0.5" aria-label="Envios por dia">
            {data.map((d, i) => {
              const height = (d.total / max) * 100;
              // Uma data por semana, contando a partir de hoje (última coluna), para os rótulos não se encostarem.
              const showLabel = (data.length - 1 - i) % 7 === 0;
              return (
                <li key={d.day} className="group relative flex h-full flex-1 items-end justify-center">
                  <span
                    tabIndex={0}
                    aria-label={`${d.label}: ${d.total} ${d.total === 1 ? "envio" : "envios"}`}
                    className="flex h-full w-full cursor-default items-end justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <span
                      className="block w-full max-w-6 rounded-t-[4px] bg-navy-600 transition group-hover:bg-navy-800 group-focus-within:bg-navy-800"
                      style={{ height: `${height}%`, minHeight: d.total > 0 ? 3 : 0 }}
                    />
                  </span>
                  {d === peak && d.total > 0 && (
                    <span className="pointer-events-none absolute text-xs font-extrabold text-navy-900 tabular-nums" style={{ bottom: `calc(${height}% + 4px)` }}>
                      {d.total}
                    </span>
                  )}
                  {/* Dica ao passar o mouse / foco */}
                  <span
                    role="presentation"
                    className="pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-lg bg-navy-950 px-2.5 py-1.5 text-center text-xs text-white shadow-lg group-hover:block group-focus-within:block"
                    style={{ bottom: `calc(${height}% + 8px)` }}
                  >
                    <b className="block text-sm tabular-nums">{d.total}</b>
                    <span className="text-white/75">{d.label}</span>
                  </span>
                  {showLabel && (
                    <span className="absolute -bottom-6 whitespace-nowrap text-[11px] font-semibold text-muted" aria-hidden="true">
                      {d.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <span className="pointer-events-none absolute inset-x-0 bottom-6 h-px bg-navy-900/25" aria-hidden="true" />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        {sum === 0 ? "Nenhum envio nos últimos 30 dias." : `${sum} ${sum === 1 ? "envio" : "envios"} nos últimos 30 dias · pico de ${peak.total} em ${peak.label}.`}
      </figcaption>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-bold text-navy-700 hover:text-gold-700">Ver em tabela</summary>
        <div className="mt-2 max-h-60 overflow-auto rounded-xl ring-1 ring-line">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-navy-50 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-3 py-2">Dia</th>
                <th className="px-3 py-2 text-right">Envios</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {data.map((d) => (
                <tr key={d.day}>
                  <td className="px-3 py-1.5">{d.label}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{d.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
