import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusForm } from "@/components/admin/status-form";
import { ButtonLink, PageTitle, Panel, StatusBadge } from "@/components/admin/ui";
import { ArrowLeft, Mail, Phone, WhatsApp } from "@/components/icons";
import { requireAdmin } from "@/lib/admin/auth";
import { dateTime, fields, isKindSlug, kindInfo, phoneDigits } from "@/lib/admin/labels";
import { getSubmission } from "@/lib/submissions";

export async function generateMetadata({ params }: PageProps<"/admin/[tipo]/[protocolo]">): Promise<Metadata> {
  const { protocolo } = await params;
  return { title: protocolo };
}

export default async function SubmissionPage({ params }: PageProps<"/admin/[tipo]/[protocolo]">) {
  const { tipo, protocolo } = await params;
  if (!isKindSlug(tipo)) notFound();
  await requireAdmin();

  const record = await getSubmission(decodeURIComponent(protocolo));
  if (!record || record.kind !== kindInfo[tipo].kind) notFound();

  const info = kindInfo[tipo];
  const email = String(record.email ?? "");
  const phone = String(record.phone ?? "");
  const digits = phoneDigits(phone);
  const firstName = String(record.name ?? "").split(/\s+/)[0];
  const list = fields(record).filter((f) => f.value);

  return (
    <>
      <Link href={`/admin/${tipo}`} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-navy-700 hover:text-gold-700">
        <ArrowLeft size={16} /> {info.title}
      </Link>
      <PageTitle
        title={String(record.name ?? "") || record.protocol}
        subtitle={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{info.singular}</span>
            <span className="font-mono text-navy-700">{record.protocol}</span>
            <span>recebido em {dateTime(record.receivedAt)}</span>
            <StatusBadge status={record.status} />
          </span>
        }
        actions={
          <>
            {email && (
              <ButtonLink href={`mailto:${email}?subject=${encodeURIComponent(`Infinita Esperança – ${info.singular} ${record.protocol}`)}`} variant="navy">
                <Mail size={18} /> Responder por e-mail
              </ButtonLink>
            )}
            {digits.length >= 8 && (
              <ButtonLink
                href={`https://wa.me/${digits}?text=${encodeURIComponent(`Olá${firstName ? `, ${firstName}` : ""}! Aqui é da Infinita Esperança, sobre o seu contato pelo site (${record.protocol}).`)}`}
                variant="green"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp size={18} /> WhatsApp
              </ButtonLink>
            )}
            {digits.length >= 8 && (
              <ButtonLink href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                <Phone size={18} /> Ligar
              </ButtonLink>
            )}
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
        <Panel title="Dados enviados">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {list.map((f) => (
              <div key={f.label} className={f.long ? "sm:col-span-2" : ""}>
                <dt className="text-xs font-black uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className={`mt-1 text-[15.5px] text-navy-900 ${f.long ? "whitespace-pre-line rounded-xl bg-cream p-4 leading-relaxed" : "font-bold wrap-break-word"}`}>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          {record.userId && (
            <p className="mt-5 border-t border-line pt-4 text-sm text-muted">Enviado por um apoiador conectado à sua conta no site.</p>
          )}
        </Panel>

        <Panel title="Acompanhamento da equipe">
          <StatusForm protocol={record.protocol} status={record.status} note={record.note} />
          {record.updatedAt && <p className="mt-4 text-xs text-muted">Última alteração: {dateTime(record.updatedAt)}</p>}
        </Panel>
      </div>
    </>
  );
}
