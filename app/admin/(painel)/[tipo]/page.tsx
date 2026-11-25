import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState, ExportButton, FilterBar, PAGE_SIZE, PageTitle, Pagination, StatusBadge, pageNumber, param } from "@/components/admin/ui";
import { ChevronRight } from "@/components/icons";
import { requireAdmin } from "@/lib/admin/auth";
import { dateTime, isKindSlug, kindInfo, kindSlugs, summary } from "@/lib/admin/labels";
import { isStatus, listSubmissions } from "@/lib/submissions";

export function generateStaticParams() {
  return kindSlugs.map((tipo) => ({ tipo }));
}

export async function generateMetadata({ params }: PageProps<"/admin/[tipo]">): Promise<Metadata> {
  const { tipo } = await params;
  return { title: isKindSlug(tipo) ? kindInfo[tipo].title : "Painel" };
}

export default async function KindListPage({ params, searchParams }: PageProps<"/admin/[tipo]">) {
  const { tipo } = await params;
  if (!isKindSlug(tipo)) notFound();
  await requireAdmin();

  const sp = await searchParams;
  const q = param(sp.busca).slice(0, 100);
  const statusParam = param(sp.andamento);
  const status = isStatus(statusParam) ? statusParam : "";
  const page = pageNumber(sp.pagina);
  const info = kindInfo[tipo];
  const base = `/admin/${tipo}`;

  const { items, total } = await listSubmissions({ kind: info.kind, status, q, offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const filtered = Boolean(q || status);

  return (
    <>
      <PageTitle
        title={info.title}
        subtitle={`${total} ${total === 1 ? "registro" : "registros"}${filtered ? " com estes filtros" : ""}.${
          tipo === "doacoes" ? " Doações por PIX, transferência ou MB WAY: confira o pagamento no banco antes de marcar como concluída." : ""
        }`}
        actions={<ExportButton href={`/admin/exportar/${tipo}`} />}
      />
      <FilterBar action={base} status={status} q={q} />

      {items.length === 0 ? (
        <EmptyState>{filtered ? "Nada encontrado com estes filtros." : info.empty}</EmptyState>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[15px]">
              <thead className="bg-navy-50 text-xs font-black uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Recebido em</th>
                  <th className="px-5 py-3">Pessoa</th>
                  <th className="px-5 py-3">Resumo</th>
                  <th className="px-5 py-3">Andamento</th>
                  <th className="px-5 py-3">
                    <span className="sr-only">Abrir</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((r) => {
                  const link = `${base}/${r.protocol}`;
                  return (
                    <tr key={r.protocol} className="relative transition hover:bg-navy-50/60">
                      <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">
                        {dateTime(r.receivedAt)}
                        <span className="block font-mono text-xs text-navy-700">{r.protocol}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <Link href={link} className="font-bold text-navy-900 after:absolute after:inset-0 hover:text-gold-700">
                          {String(r.name ?? "") || "—"}
                        </Link>
                        <span className="block text-sm text-muted">{String(r.email ?? "")}</span>
                      </td>
                      <td className="max-w-xs px-5 py-3.5 text-ink/85">
                        <span className="line-clamp-2">{summary(r)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-5 py-3.5 text-right text-navy-700">
                        <ChevronRight size={18} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Pagination base={base} page={page} pages={pages} params={{ busca: q, andamento: status }} />
    </>
  );
}
