import type { Metadata } from "next";
import { PageTitle, Panel } from "@/components/admin/ui";
import { AlertTriangle, CheckCircle, Info } from "@/components/icons";
import { requireAdmin } from "@/lib/admin/auth";
import { setupChecks, type Check } from "@/lib/admin/setup";

export const metadata: Metadata = { title: "Configuração" };

const look: Record<Check["state"], { Icon: typeof CheckCircle; label: string; cls: string }> = {
  ok: { Icon: CheckCircle, label: "Pronto", cls: "bg-leaf-50 text-leaf-700 ring-leaf-600/25" },
  warn: { Icon: Info, label: "Recomendado", cls: "bg-gold-50 text-gold-700 ring-gold-500/30" },
  missing: { Icon: AlertTriangle, label: "Falta configurar", cls: "bg-red-50 text-red-700 ring-red-500/25" },
};

export default async function SetupPage() {
  await requireAdmin();
  const checks = await setupChecks();
  const done = checks.filter((c) => c.state === "ok").length;

  return (
    <>
      <PageTitle
        title="Configuração"
        subtitle={`${done} de ${checks.length} itens prontos. As variáveis ficam na Vercel em Settings → Environment Variables (ou no arquivo .env.local do computador).`}
      />
      <Panel>
        <ul className="divide-y divide-line">
          {checks.map((c) => {
            const { Icon, label, cls } = look[c.state];
            return (
              <li key={c.title} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-5">
                <span className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 sm:w-40 ${cls}`}>
                  <Icon size={15} /> {label}
                </span>
                <div className="min-w-0">
                  <p className="font-extrabold text-navy-900">
                    {c.title}
                    {c.required && <span className="ml-2 text-xs font-bold uppercase tracking-wider text-muted">obrigatório</span>}
                  </p>
                  <p className="mt-0.5 text-[15px] text-ink/85">{c.detail}</p>
                  {c.state !== "ok" && c.fix && <p className="mt-1 text-sm text-muted">Como resolver: {c.fix}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </>
  );
}
