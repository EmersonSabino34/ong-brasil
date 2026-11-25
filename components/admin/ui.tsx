import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Download, Search } from "@/components/icons";
import { statusInfo, submissionStatuses, type SubmissionStatus } from "@/lib/statuses";

/** Peças visuais do painel administrativo. */

export function PageTitle({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-serif text-[1.75rem] font-black leading-tight text-navy-900 sm:text-[2rem]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-[15.5px] text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function Panel({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="text-[17px] font-extrabold text-navy-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  const info = statusInfo[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ${info.tone}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {info.label}
    </span>
  );
}

/** Cartão de número (KPI): rótulo, valor e uma linha de apoio. */
export function StatTile({ label, value, detail, href, icon }: { label: string; value: string; detail?: ReactNode; href?: string; icon: ReactNode }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[14.5px] font-bold text-muted">{label}</p>
        <span className="grid size-9 place-items-center rounded-full bg-navy-50 text-navy-700">{icon}</span>
      </div>
      <p className="mt-2 text-[2rem] font-extrabold leading-none tracking-tight text-navy-900 tabular-nums">{value}</p>
      {detail && <p className="mt-2 text-sm text-muted">{detail}</p>}
    </>
  );
  const cls = "card block p-5 transition";
  return href ? (
    <Link href={href} className={`${cls} hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-gold-500`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center text-muted">{children}</div>;
}

export function ButtonLink({ href, children, variant = "light", ...rest }: { href: string; children: ReactNode; variant?: "light" | "navy" | "green"; target?: string; rel?: string; download?: boolean }) {
  const styles = {
    light: "border border-line bg-white text-navy-900 hover:border-navy-600/40 hover:bg-navy-50",
    navy: "bg-navy-700 text-white hover:bg-navy-800",
    green: "bg-[#1c9e52] text-white hover:bg-[#178745]",
  }[variant];
  return (
    <a href={href} className={`btn px-4 py-2.5 text-[15px] ${styles}`} {...rest}>
      {children}
    </a>
  );
}

export function ExportButton({ href }: { href: string }) {
  return (
    <ButtonLink href={href} download>
      <Download size={18} /> Exportar planilha (CSV)
    </ButtonLink>
  );
}

/** Filtros por andamento e busca. Formulário GET simples: funciona até sem JavaScript. */
export function FilterBar({ action, status, q, withStatus = true }: { action: string; status?: string; q: string; withStatus?: boolean }) {
  return (
    <form action={action} className="mb-5 flex flex-wrap items-end gap-3" role="search">
      {withStatus && (
        <label className="min-w-44">
          <span className="field-label">Andamento</span>
          <select name="andamento" defaultValue={status} className="field py-2.5">
            <option value="">Todos</option>
            {submissionStatuses.map((st) => (
              <option key={st} value={st}>
                {statusInfo[st].label}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="min-w-56 flex-1">
        <span className="field-label">Buscar</span>
        <input type="search" name="busca" defaultValue={q} placeholder="Nome, e-mail, protocolo, cidade…" className="field py-2.5" />
      </label>
      <button type="submit" className="btn-navy px-5 py-3">
        <Search size={18} /> Filtrar
      </button>
      {(q || status) && (
        <Link href={action} className="btn px-4 py-3 text-navy-700 hover:bg-navy-50">
          Limpar
        </Link>
      )}
    </form>
  );
}

export function Pagination({ base, page, pages, params }: { base: string; page: number; pages: number; params: Record<string, string> }) {
  if (pages <= 1) return null;
  const link = (p: number) => {
    const sp = new URLSearchParams({ ...params, ...(p > 1 ? { pagina: String(p) } : {}) });
    for (const [k, v] of [...sp]) if (!v) sp.delete(k);
    const qs = sp.toString();
    return qs ? `${base}?${qs}` : base;
  };
  const btn = "btn border border-line bg-white px-3.5 py-2 text-navy-900 hover:bg-navy-50";
  return (
    <nav aria-label="Paginação" className="mt-5 flex items-center justify-between gap-3 text-sm font-bold text-muted">
      <span>
        Página {page} de {pages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link href={link(page - 1)} className={btn}>
            <ChevronLeft size={16} /> Anterior
          </Link>
        ) : null}
        {page < pages ? (
          <Link href={link(page + 1)} className={btn}>
            Próxima <ChevronRight size={16} />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="mb-3 h-9 w-64 rounded-lg bg-navy-100" />
      <div className="mb-8 h-5 w-96 max-w-full rounded bg-navy-50" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-white" />
        ))}
      </div>
      <div className="mt-6 h-72 rounded-2xl bg-white" />
    </div>
  );
}

/** Lê um parâmetro de busca da URL como texto. */
export function param(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export const PAGE_SIZE = 25;

export function pageNumber(value: string | string[] | undefined) {
  const n = Number.parseInt(param(value), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}
