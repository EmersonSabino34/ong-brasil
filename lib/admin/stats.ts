import type { DayCount } from "@/components/admin/daily-chart";
import { listUsers } from "@/lib/auth/users";
import { formatMoney } from "@/lib/content/donation";
import { allSubmissions, type SubmissionKind, type SubmissionRecord } from "@/lib/submissions";

const TZ = "America/Sao_Paulo";
const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const dayLabel = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "short" });

/** Últimos 30 dias (fuso de Brasília), com o total de envios de cada dia. */
function last30Days(records: SubmissionRecord[]): DayCount[] {
  const counts = new Map<string, number>();
  for (const r of records) {
    const date = new Date(r.receivedAt);
    if (Number.isNaN(date.getTime())) continue;
    const key = dayKey.format(date);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const today = dayKey.format(new Date());
  const base = new Date(`${today}T12:00:00Z`);
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() - (29 - i));
    const key = d.toISOString().slice(0, 10);
    return { day: key, label: dayLabel.format(d).replace(".", ""), total: counts.get(key) ?? 0 };
  });
}

export async function dashboardData() {
  const [records, users] = await Promise.all([allSubmissions(), listUsers()]);

  const byKind = (kind: SubmissionKind) => records.filter((r) => r.kind === kind);
  const count = (kind: SubmissionKind) => {
    const list = byKind(kind);
    return { total: list.length, fresh: list.filter((r) => r.status === "novo").length };
  };

  // Doações arquivadas (ex.: duplicadas ou desistências) ficam fora dos totais.
  const donations = byKind("doacao").filter((r) => r.status !== "arquivado");
  const sum = (currency: "BRL" | "EUR") =>
    donations.filter((r) => (r.currency === "EUR" ? "EUR" : "BRL") === currency).reduce((acc, r) => acc + (Number(r.amount) || 0), 0);

  return {
    kinds: {
      doacao: count("doacao"),
      voluntario: count("voluntario"),
      parceria: count("parceria"),
      contato: count("contato"),
    },
    totals: { BRL: formatMoney(sum("BRL"), "BRL", "pt"), EUR: formatMoney(sum("EUR"), "EUR", "pt") },
    monthlyDonors: donations.filter((r) => r.frequency === "mensal").length,
    users: { total: users.length, newsletter: users.filter((u) => u.newsletter).length },
    pending: records.filter((r) => r.status === "novo").slice(0, 8),
    daily: last30Days(records),
  };
}
