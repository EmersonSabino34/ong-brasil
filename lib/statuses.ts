/** Andamento de cada envio, marcado pela equipe no painel (sem dependências: pode ir para o navegador). */
export const submissionStatuses = ["novo", "andamento", "concluido", "arquivado"] as const;
export type SubmissionStatus = (typeof submissionStatuses)[number];

export function isStatus(value: string): value is SubmissionStatus {
  return (submissionStatuses as readonly string[]).includes(value);
}

/** Nome e cores de cada andamento no painel. */
export const statusInfo: Record<SubmissionStatus, { label: string; tone: string }> = {
  novo: { label: "Novo", tone: "bg-gold-100 text-gold-700 ring-gold-500/30" },
  andamento: { label: "Em andamento", tone: "bg-navy-100 text-navy-700 ring-navy-600/25" },
  concluido: { label: "Concluído", tone: "bg-leaf-50 text-leaf-700 ring-leaf-600/25" },
  arquivado: { label: "Arquivado", tone: "bg-black/5 text-muted ring-black/10" },
};
