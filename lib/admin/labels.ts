import { areas } from "@/lib/content/areas";
import { donation, formatMoney, type Currency, type Method } from "@/lib/content/donation";
import { forms } from "@/lib/content/forms";
import { localeLabels, type T } from "@/lib/i18n";
import type { SubmissionKind, SubmissionRecord } from "@/lib/submissions";

/** Textos do painel administrativo (só em português). */

export type KindSlug = "doacoes" | "voluntarios" | "parcerias" | "mensagens";

export const kindInfo: Record<KindSlug, { kind: SubmissionKind; title: string; singular: string; empty: string }> = {
  doacoes: { kind: "doacao", title: "Doações", singular: "Doação", empty: "Nenhuma doação registrada ainda." },
  voluntarios: { kind: "voluntario", title: "Voluntários", singular: "Inscrição de voluntário", empty: "Nenhuma inscrição de voluntário ainda." },
  parcerias: { kind: "parceria", title: "Parcerias", singular: "Proposta de parceria", empty: "Nenhuma proposta de parceria ainda." },
  mensagens: { kind: "contato", title: "Mensagens", singular: "Mensagem de contato", empty: "Nenhuma mensagem recebida ainda." },
};

export const kindSlugs = Object.keys(kindInfo) as KindSlug[];

export function isKindSlug(value: string): value is KindSlug {
  return value in kindInfo;
}

export function slugOfKind(kind: SubmissionKind): KindSlug {
  return kindSlugs.find((s) => kindInfo[s].kind === kind) ?? "mensagens";
}

export { statusInfo } from "@/lib/statuses";

const s = (value: unknown) => (typeof value === "string" ? value : "");
const pick = (map: Record<string, T>, key: string) => (key in map ? map[key].pt : key);

export function money(record: SubmissionRecord) {
  const currency = (s(record.currency) === "EUR" ? "EUR" : "BRL") as Currency;
  return formatMoney(Number(record.amount) || 0, currency, "pt");
}

function destination(slug: string) {
  return areas.find((a) => a.slug === slug)?.title.pt ?? donation.destinationGeneral.pt;
}

/** Linha curta para a lista (o que é, em poucas palavras). */
export function summary(record: SubmissionRecord) {
  switch (record.kind) {
    case "doacao":
      return [
        money(record),
        s(record.frequency) === "mensal" ? "Mensal" : "Única",
        pick(donation.methods, s(record.method)),
      ].join(" · ");
    case "voluntario":
      return [s(record.city), pick(forms.countries, s(record.country)), pick(forms.availabilityOptions, s(record.availability))]
        .filter(Boolean)
        .join(" · ");
    case "parceria":
      return [s(record.organization), pick(forms.partnerTypes, s(record.type))].filter(Boolean).join(" · ");
    default:
      return pick(forms.contactSubjects, s(record.subject));
  }
}

export type Field = { label: string; value: string; long?: boolean };

/** Todos os campos do envio, com rótulos em português (página de detalhe e planilha). */
export function fields(record: SubmissionRecord): Field[] {
  const contact: Field[] = [
    { label: "Nome", value: s(record.name) },
    { label: "E-mail", value: s(record.email) },
    { label: "Telefone", value: s(record.phone) },
  ];
  const lang = s(record.lang);
  const site: Field = { label: "Idioma do site", value: lang in localeLabels ? localeLabels[lang as keyof typeof localeLabels].name : lang };

  switch (record.kind) {
    case "doacao":
      return [
        { label: "Valor", value: money(record) },
        { label: "Tipo", value: s(record.frequency) === "mensal" ? "Mensal (recorrente)" : "Única" },
        { label: "Forma de pagamento", value: pick(donation.methods, s(record.method) as Method) },
        { label: "Destino", value: destination(s(record.destination)) },
        ...contact,
        { label: "CPF / NIF", value: s(record.document) },
        { label: "Doação anônima", value: record.anonymous ? "Sim" : "Não" },
        site,
      ];
    case "voluntario":
      return [
        ...contact,
        { label: "País", value: pick(forms.countries, s(record.country)) },
        { label: "Cidade", value: s(record.city) },
        { label: "Disponibilidade", value: pick(forms.availabilityOptions, s(record.availability)) },
        {
          label: "Áreas de interesse",
          value: (Array.isArray(record.areas) ? record.areas : []).map((a) => pick(forms.volunteerAreas, String(a))).join(", "),
        },
        { label: "Sobre a pessoa", value: s(record.message), long: true },
        site,
      ];
    case "parceria":
      return [
        { label: "Empresa / instituição", value: s(record.organization) },
        ...contact,
        { label: "País", value: pick(forms.countries, s(record.country)) },
        { label: "Tipo de parceria", value: pick(forms.partnerTypes, s(record.type)) },
        { label: "Proposta", value: s(record.message), long: true },
        site,
      ];
    default:
      return [...contact, { label: "Assunto", value: pick(forms.contactSubjects, s(record.subject)) }, { label: "Mensagem", value: s(record.message), long: true }, site];
  }
}

/** Data e hora no fuso de Brasília. */
export function dateTime(iso: string | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(date);
}

/** Só os dígitos de um telefone, para o link do WhatsApp (wa.me). */
export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}
