import type { Metadata } from "next";
import Link from "next/link";
import { DailyChart } from "@/components/admin/daily-chart";
import { ButtonLink, EmptyState, PageTitle, Panel, StatTile, StatusBadge } from "@/components/admin/ui";
import { AlertTriangle, ArrowRight, Clock, Handshake, HandHeart, Heart, MessageCircle, Users } from "@/components/icons";
import { requireAdmin } from "@/lib/admin/auth";
import { dateTime, kindInfo, slugOfKind, summary } from "@/lib/admin/labels";
import { setupChecks } from "@/lib/admin/setup";
import { dashboardData } from "@/lib/admin/stats";

export const metadata: Metadata = { title: "Visão geral" };

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default async function AdminHome() {
  const admin = await requireAdmin();
  const [data, checks] = await Promise.all([dashboardData(), setupChecks()]);
  const missing = checks.filter((c) => c.state !== "ok" && c.required);
  const { kinds } = data;
  const waiting = kinds.doacao.fresh + kinds.voluntario.fresh + kinds.parceria.fresh + kinds.contato.fresh;

  return (
    <>
      <PageTitle
        title="Visão geral"
        subtitle={
          <>
            Você entrou como <b className="text-navy-900">{admin.email}</b>.
          </>
        }
        actions={<ButtonLink href="/admin/mensagens?andamento=novo">Ver mensagens novas</ButtonLink>}
      />

      {missing.length > 0 && (
        <Link
          href="/admin/configuracao"
          className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-gold-500/40 bg-gold-50 px-5 py-4 font-bold text-gold-700 hover:bg-gold-100"
        >
          <span className="flex items-start gap-3">
            <AlertTriangle size={20} className="mt-0.5 shrink-0" />
            <span>
              {plural(missing.length, "item precisa", "itens precisam")} de atenção para o site funcionar 100% na internet:{" "}
              {missing.map((m) => m.title).join(", ")}.
            </span>
          </span>
          <ArrowRight size={20} className="shrink-0" />
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatTile
          label="Doações registradas"
          value={String(kinds.doacao.total)}
          detail={`${data.totals.BRL} · ${data.totals.EUR} · ${plural(data.monthlyDonors, "mensal", "mensais")}`}
          href="/admin/doacoes"
          icon={<Heart size={18} />}
        />
        <StatTile
          label="Voluntários inscritos"
          value={String(kinds.voluntario.total)}
          detail={plural(kinds.voluntario.fresh, "novo para contatar", "novos para contatar")}
          href="/admin/voluntarios"
          icon={<HandHeart size={18} />}
        />
        <StatTile
          label="Propostas de parceria"
          value={String(kinds.parceria.total)}
          detail={plural(kinds.parceria.fresh, "nova", "novas")}
          href="/admin/parcerias"
          icon={<Handshake size={18} />}
        />
        <StatTile
          label="Mensagens de contato"
          value={String(kinds.contato.total)}
          detail={`${kinds.contato.fresh} sem resposta`}
          href="/admin/mensagens"
          icon={<MessageCircle size={18} />}
        />
        <StatTile
          label="Apoiadores com conta"
          value={String(data.users.total)}
          detail={`${plural(data.users.newsletter, "recebe", "recebem")} novidades por e-mail`}
          href="/admin/apoiadores"
          icon={<Users size={18} />}
        />
        <StatTile label="Aguardando a equipe" value={String(waiting)} detail="envios marcados como “Novo”" icon={<Clock size={18} />} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Panel title="Envios por dia – últimos 30 dias">
          <DailyChart data={data.daily} />
        </Panel>

        <Panel title="Para responder" action={<span className="text-sm font-bold text-muted">mais recentes primeiro</span>}>
          {data.pending.length === 0 ? (
            <EmptyState>Tudo em dia! Nenhum envio novo esperando resposta.</EmptyState>
          ) : (
            <ul className="-mx-2 divide-y divide-line">
              {data.pending.map((r) => {
                const slug = slugOfKind(r.kind);
                return (
                  <li key={r.protocol}>
                    <Link href={`/admin/${slug}/${r.protocol}`} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-navy-50">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-navy-900">{String(r.name ?? "") || r.protocol}</p>
                        <p className="truncate text-sm text-muted">
                          {kindInfo[slug].singular} · {summary(r)}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <StatusBadge status={r.status} />
                        <span className="text-xs text-muted">{dateTime(r.receivedAt)}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
