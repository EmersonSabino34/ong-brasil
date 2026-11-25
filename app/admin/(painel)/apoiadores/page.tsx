import type { Metadata } from "next";
import { EmptyState, ExportButton, FilterBar, PAGE_SIZE, PageTitle, Pagination, pageNumber, param } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { dateTime } from "@/lib/admin/labels";
import { listUsers } from "@/lib/auth/users";
import { forms } from "@/lib/content/forms";

export const metadata: Metadata = { title: "Apoiadores" };

const country = (code: string) => (code in forms.countries ? forms.countries[code as keyof typeof forms.countries].pt : code);

export default async function SupportersPage({ searchParams }: PageProps<"/admin/apoiadores">) {
  await requireAdmin();
  const sp = await searchParams;
  const q = param(sp.busca).slice(0, 100).toLowerCase();
  const page = pageNumber(sp.pagina);

  const all = (await listUsers()).filter((u) => !q || `${u.name} ${u.email} ${u.phone}`.toLowerCase().includes(q));
  const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const items = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageTitle
        title="Apoiadores"
        subtitle={`${all.length} ${all.length === 1 ? "pessoa criou conta" : "pessoas criaram conta"} no site${q ? " com esta busca" : ""}. Senhas nunca aparecem aqui.`}
        actions={<ExportButton href="/admin/exportar/apoiadores" />}
      />
      <FilterBar action="/admin/apoiadores" q={q} withStatus={false} />

      {items.length === 0 ? (
        <EmptyState>{q ? "Ninguém encontrado com esta busca." : "Ninguém criou conta ainda."}</EmptyState>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[15px]">
              <thead className="bg-navy-50 text-xs font-black uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Nome</th>
                  <th className="px-5 py-3">Telefone</th>
                  <th className="px-5 py-3">País</th>
                  <th className="px-5 py-3">Novidades</th>
                  <th className="px-5 py-3">Cadastro</th>
                  <th className="px-5 py-3">Último acesso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3.5">
                      <span className="font-bold text-navy-900">{u.name}</span>
                      <a href={`mailto:${u.email}`} className="block text-sm text-muted hover:text-gold-700">
                        {u.email}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-ink/85">{u.phone || "—"}</td>
                    <td className="px-5 py-3.5 text-ink/85">{country(u.country)}</td>
                    <td className="px-5 py-3.5">
                      {u.newsletter ? (
                        <span className="rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-extrabold text-leaf-700 ring-1 ring-leaf-600/25">Sim</span>
                      ) : (
                        <span className="text-sm text-muted">Não</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">{dateTime(u.createdAt)}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">{dateTime(u.lastLoginAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Pagination base="/admin/apoiadores" page={page} pages={pages} params={{ busca: q }} />
    </>
  );
}
