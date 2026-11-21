import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { signOut } from "@/app/auth-actions";
import { Notice } from "@/components/auth/auth-forms";
import { Calendar, Handshake, HandHeart, Heart, KeyRound, LogOut, MessageCircle, Users } from "@/components/icons";
import { getCurrentUser } from "@/lib/auth/current-user";
import { areas } from "@/lib/content/areas";
import { auth } from "@/lib/content/auth";
import { donation, formatMoney, type Currency, type Frequency } from "@/lib/content/donation";
import { forms } from "@/lib/content/forms";
import { dateLocale, href, translator, type Locale, type T } from "@/lib/i18n";
import { submissionsByUser, type SubmissionRecord } from "@/lib/submissions";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const s = (value: unknown) => (typeof value === "string" ? value : "");

function formatDay(iso: string, lang: Locale, month: "short" | "long" = "short") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(dateLocale[lang], { day: "2-digit", month, year: "numeric" }).format(date);
}

function label<K extends string>(map: Record<K, T>, key: string, lang: Locale) {
  return key in map ? map[key as K][lang] : key;
}

function Card({ title, icon, children, action }: { title: string; icon: ReactNode; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="card p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 font-serif text-xl font-black text-navy-900 sm:text-[1.4rem]">
          <span className="grid size-10 place-items-center rounded-full bg-navy-50 text-navy-700">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({ text, cta }: { text: string; cta: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-cream px-5 py-8 text-center">
      <p className="mx-auto max-w-md text-[15.5px] text-muted">{text}</p>
      <div className="mt-4">{cta}</div>
    </div>
  );
}

function Badge({ children, tone }: { children: ReactNode; tone: "gold" | "navy" | "leaf" }) {
  const styles = {
    gold: "bg-gold-100 text-gold-700",
    navy: "bg-navy-100 text-navy-700",
    leaf: "bg-leaf-50 text-leaf-700",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ${styles}`}>{children}</span>;
}

function DonationList({ lang, items }: { lang: Locale; items: SubmissionRecord[] }) {
  const t = translator(lang);
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl ring-1 ring-line">
      {items.map((d) => {
        const currency = (s(d.currency) === "EUR" ? "EUR" : "BRL") as Currency;
        const frequency = (s(d.frequency) === "mensal" ? "mensal" : "unica") as Frequency;
        const area = areas.find((a) => a.slug === s(d.destination));
        return (
          <li key={s(d.protocol) || d.receivedAt} className="flex flex-col gap-3 bg-white px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
            <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-gold-50 text-gold-700 sm:grid">
              <Heart size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2">
                <b className="font-serif text-lg font-black text-navy-900">
                  {formatMoney(Number(d.amount) || 0, currency, lang)}
                  {frequency === "mensal" && <span className="text-sm font-bold text-muted">{t(donation.perMonth)}</span>}
                </b>
                <Badge tone={frequency === "mensal" ? "navy" : "leaf"}>{t(donation.frequencies[frequency])}</Badge>
              </p>
              <p className="mt-0.5 truncate text-[14.5px] text-ink/85">{area ? t(area.title) : t(donation.destinationGeneral)}</p>
              <p className="mt-0.5 text-[13.5px] text-muted">
                {label(donation.methods, s(d.method), lang)} · {formatDay(d.receivedAt, lang)}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1.5">
              <Badge tone="gold">{t(auth.account.pending)}</Badge>
              <span className="text-xs text-muted">
                {t(auth.account.protocol)}: <b className="font-mono text-[13px] text-navy-900">{s(d.protocol)}</b>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ApplicationList({ lang, volunteers, partners }: { lang: Locale; volunteers: SubmissionRecord[]; partners: SubmissionRecord[] }) {
  const t = translator(lang);
  const items = [
    ...volunteers.map((v) => ({
      record: v,
      kind: t(auth.account.volunteer),
      Icon: HandHeart,
      title: (Array.isArray(v.areas) ? (v.areas as string[]) : []).map((a) => label(forms.volunteerAreas, a, lang)).join(", "),
      detail: [label(forms.availabilityOptions, s(v.availability), lang), s(v.city)].filter(Boolean).join(" · "),
    })),
    ...partners.map((p) => ({
      record: p,
      kind: t(auth.account.partner),
      Icon: Handshake,
      title: s(p.organization),
      detail: label(forms.partnerTypes, s(p.type), lang),
    })),
  ].sort((a, b) => b.record.receivedAt.localeCompare(a.record.receivedAt));

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl ring-1 ring-line">
      {items.map(({ record, kind, Icon, title, detail }) => (
        <li key={s(record.protocol) || record.receivedAt} className="flex flex-col gap-3 bg-white px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
          <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700 sm:grid">
            <Icon size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-wider text-gold-700">{kind}</p>
            <p className="mt-0.5 font-bold text-navy-900">{title}</p>
            <p className="mt-0.5 text-[13.5px] text-muted">
              {detail}
              {detail && " · "}
              {formatDay(record.receivedAt, lang)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1.5">
            <Badge tone="navy">{t(auth.account.received)}</Badge>
            <span className="text-xs text-muted">
              {t(auth.account.protocol)}: <b className="font-mono text-[13px] text-navy-900">{s(record.protocol)}</b>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Conteúdo de "Minha conta". Lê a sessão: precisa ficar dentro de um <Suspense>. */
export async function AccountDashboard({ lang, searchParams }: { lang: Locale; searchParams: SearchParams }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${lang}/entrar?next=${encodeURIComponent(`/${lang}/minha-conta`)}`);

  const t = translator(lang);
  const sp = await searchParams;
  const [donations, volunteers, partners] = await Promise.all([
    submissionsByUser("doacao", user.id),
    submissionsByUser("voluntario", user.id),
    submissionsByUser("parceria", user.id),
  ]);

  const totals = (["BRL", "EUR"] as Currency[])
    .map((c) => ({ c, sum: donations.filter((d) => (s(d.currency) === "EUR" ? "EUR" : "BRL") === c).reduce((acc, d) => acc + (Number(d.amount) || 0), 0) }))
    .filter((x) => x.sum > 0)
    .map((x) => formatMoney(x.sum, x.c, lang));

  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

  const stats = [
    { label: t(auth.account.stats.donations), value: String(donations.length), Icon: Heart },
    { label: t(auth.account.stats.total), value: totals.length ? totals.join(" · ") : "—", Icon: HandHeart },
    { label: t(auth.account.stats.applications), value: String(volunteers.length + partners.length), Icon: Users },
  ];

  const shortcuts = [
    { label: t(auth.account.donateNow), path: "/doe", Icon: Heart, gold: true },
    { label: t(auth.account.beVolunteer), path: "/como-ajudar/voluntario", Icon: HandHeart },
    { label: t(auth.account.bePartner), path: "/como-ajudar/parcerias", Icon: Handshake },
    { label: t(auth.account.talkToUs), path: "/contato", Icon: MessageCircle },
  ];

  const data = [
    { label: forms.email[lang], value: user.email, breakAll: true },
    { label: forms.phone[lang], value: user.phone || t(auth.account.notInformed) },
    { label: forms.country[lang], value: label(forms.countries, user.country, lang) },
    { label: t(auth.account.newsletterLabel), value: user.newsletter ? t(auth.account.yes) : t(auth.account.no) },
  ];

  return (
    <section className="container-site py-10 sm:py-12">
      {(sp.bemvindo || sp.senha) && (
        <div className="mb-6">
          <Notice tone="success">{sp.bemvindo ? t(auth.account.welcome) : t(auth.account.passwordChanged)}</Notice>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start xl:grid-cols-[370px_minmax(0,1fr)]">
        {/* Perfil */}
        <aside className="card overflow-hidden lg:sticky lg:top-20">
          <div className="relative bg-[linear-gradient(135deg,#082b4f_0%,#0e4470_100%)] px-6 pb-6 pt-7 text-white">
            <span className="grid size-20 place-items-center rounded-full bg-[linear-gradient(180deg,#f7cb4d,#e2a414)] font-serif text-[1.7rem] font-black text-navy-900 ring-4 ring-white/20">
              {initials || "?"}
            </span>
            <p className="mt-4 font-serif text-[1.35rem] font-black leading-tight">{user.name}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
              <Calendar size={15} /> {t(auth.account.memberSince)} {formatDay(user.createdAt, lang, "long")}
            </p>
          </div>
          <div className="p-6">
            <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-muted">{t(auth.account.myData)}</h2>
            <dl className="space-y-3.5">
              {data.map((d) => (
                <div key={d.label}>
                  <dt className="text-[13px] font-bold text-muted">{d.label}</dt>
                  <dd className={`font-bold text-navy-900 ${d.breakAll ? "break-all" : "wrap-break-word"}`}>{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-2.5 border-t border-line pt-5">
              <Link href={href(lang, "/esqueci-senha")} className="btn w-full border border-line py-3 text-navy-900 hover:border-navy-600 hover:bg-navy-50">
                <KeyRound size={18} /> {t(auth.account.changePassword)}
              </Link>
              <form action={signOut}>
                <input type="hidden" name="lang" value={lang} />
                <button type="submit" className="btn w-full border border-red-200 py-3 text-red-700 hover:bg-red-50">
                  <LogOut size={18} /> {t(auth.account.logout)}
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          {/* Saudação e números */}
          <section className="card p-5 sm:p-7">
            <p className="font-script text-[2rem] leading-none text-gold-600">
              {t(auth.hello)}, {user.firstName}!
            </p>
            <p className="mt-2 text-[16px] text-ink/85">{t(auth.account.subtitle)}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {stats.map(({ label: l, value, Icon }) => (
                <div key={l} className="rounded-2xl bg-cream p-4 ring-1 ring-black/[0.04]">
                  <p className="flex items-center gap-2 text-[13px] font-bold text-muted">
                    <Icon size={16} className="text-gold-600" /> {l}
                  </p>
                  <p className="mt-1.5 font-serif text-[1.45rem] font-black leading-tight text-navy-900">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <Card
            title={t(auth.account.donations)}
            icon={<Heart size={20} />}
            action={
              donations.length > 0 && (
                <Link href={href(lang, "/doe")} className="btn-gold px-4 py-2.5 text-[15px]">
                  {t(auth.account.donateNow)} <Heart size={16} />
                </Link>
              )
            }
          >
            {donations.length ? (
              <>
                <DonationList lang={lang} items={donations} />
                <p className="mt-3 text-[13.5px] text-muted">{t(auth.account.donationsNote)}</p>
              </>
            ) : (
              <Empty
                text={`${t(auth.account.noDonations)} ${t(auth.account.donationsNote)}`}
                cta={
                  <Link href={href(lang, "/doe")} className="btn-gold px-6 py-3 text-[16px]">
                    {t(auth.account.donateNow)} <Heart size={18} />
                  </Link>
                }
              />
            )}
          </Card>

          <Card title={t(auth.account.applications)} icon={<HandHeart size={20} />}>
            {volunteers.length + partners.length ? (
              <ApplicationList lang={lang} volunteers={volunteers} partners={partners} />
            ) : (
              <Empty
                text={t(auth.account.noApplications)}
                cta={
                  <Link href={href(lang, "/como-ajudar/voluntario")} className="btn-outline-gold px-6 py-3 text-[16px]">
                    {t(auth.account.beVolunteer)}
                  </Link>
                }
              />
            )}
          </Card>

          <section>
            <h2 className="mb-4 font-serif text-xl font-black text-navy-900">{t(auth.account.shortcuts)}</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {shortcuts.map(({ label: l, path, Icon, gold }) => (
                <Link
                  key={path}
                  href={href(lang, path)}
                  className={`group flex items-center gap-3 rounded-2xl p-4 font-extrabold transition ${
                    gold
                      ? "bg-[linear-gradient(180deg,#efb032_0%,#d48c08_100%)] text-white shadow-[0_10px_22px_-12px_rgb(201_131_6/0.9)] hover:brightness-105"
                      : "card text-navy-900 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full ${gold ? "bg-white/20" : "bg-navy-50 text-navy-700"}`}>
                    <Icon size={20} />
                  </span>
                  {l}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export function AccountSkeleton() {
  return (
    <div className="container-site grid animate-pulse gap-6 py-10 sm:py-12 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[370px_minmax(0,1fr)]" aria-hidden="true">
      <div className="h-[520px] rounded-2xl bg-white" />
      <div className="space-y-6">
        <div className="h-52 rounded-2xl bg-white" />
        <div className="h-64 rounded-2xl bg-white" />
        <div className="h-48 rounded-2xl bg-white" />
      </div>
    </div>
  );
}
