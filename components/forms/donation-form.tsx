"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import { registerDonation, type DonationResult, type DonationState } from "@/app/actions";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Copy, CreditCard, Heart, Landmark, Loader, QrCode, ShieldCheck, Smartphone } from "@/components/icons";
import {
  
  donation as d,
  formatMoney,
  methodsByCurrency,
  minAmount,
  presets,
  type Currency,
  type Frequency,
  type Method,
} from "@/lib/content/donation";
import { forms } from "@/lib/content/forms";
import { home } from "@/lib/content/home";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Consent, FormAlert, HiddenFields, TextField } from "./fields";

type AreaOption = { value: string; label: string };

const methodIcon: Record<Method, typeof QrCode> = { pix: QrCode, transferencia: Landmark, mbway: Smartphone, cartao: CreditCard };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const initial: DonationState = { ok: null };

/** Lê ?tipo=mensal, ?valor=50 e ?destino=<área> da URL. */
export function DonationForm({ lang, areas }: { lang: Locale; areas: AreaOption[] }) {
  const params = useSearchParams();
  const [round, setRound] = useState(0);
  const key = `${round}-${params.toString()}`;
  return (
    <Inner
      key={key}
      lang={lang}
      areas={areas}
      initialFrequency={params.get("tipo") === "mensal" ? "mensal" : "unica"}
      initialAmount={Number(params.get("valor")) || 0}
      initialDestination={areas.some((a) => a.value === params.get("destino")) ? params.get("destino")! : "geral"}
      onReset={() => setRound((r) => r + 1)}
    />
  );
}

type InnerProps = {
  lang: Locale;
  areas: AreaOption[];
  initialFrequency: Frequency;
  initialAmount: number;
  initialDestination: string;
  onReset: () => void;
};

function Inner({ lang, areas, initialFrequency, initialAmount, initialDestination, onReset }: InnerProps) {
  const [state, dispatch, pending] = useActionState(registerDonation, initial);
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<Currency>(lang === "pt" ? "BRL" : "EUR");
  const [frequency, setFrequency] = useState<Frequency>(initialFrequency);
  const [amount, setAmount] = useState<number>(initialAmount || presets[lang === "pt" ? "BRL" : "EUR"][1]);
  const [custom, setCustom] = useState(initialAmount > 0 && !presets[lang === "pt" ? "BRL" : "EUR"].includes(initialAmount));
  const [destination, setDestination] = useState(initialDestination);
  const [method, setMethod] = useState<Method>(methodsByCurrency[lang === "pt" ? "BRL" : "EUR"][0]);
  const [donor, setDonor] = useState({ name: "", email: "", phone: "", document: "" });
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  if (state.ok && state.result) return <Success lang={lang} result={state.result} onReset={onReset} />;

  const errors = { ...(state.errors ?? {}), ...localErrors };
  const money = (v: number) => formatMoney(v, currency, lang);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    setAmount(presets[c][1]);
    setCustom(false);
    setMethod(methodsByCurrency[c][0]);
  };

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!amount || amount < minAmount[currency]) errs.amount = `${forms.errors.amountMin[lang]} ${money(minAmount[currency])}.`;
      else if (amount > 100000) errs.amount = forms.errors.amountMax[lang];
    }
    if (s === 1) {
      if (donor.name.trim().length < 2) errs.name = forms.errors.required[lang];
      if (!donor.email.trim()) errs.email = forms.errors.required[lang];
      else if (!EMAIL.test(donor.email.trim())) errs.email = forms.errors.email[lang];
    }
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => validateStep(step) && setStep((s) => Math.min(2, s + 1));
  const back = () => {
    setLocalErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 2) return next();
    setLocalErrors({});
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };

  // Se o servidor apontou erro em uma etapa anterior, mostra qual etapa revisar
  const stepWithError = errors.amount || errors.destination ? 0 : errors.name || errors.email ? 1 : null;

  const impactIndex = presets[currency].indexOf(amount);

  return (
    <form onSubmit={submit} noValidate className="relative">
      <HiddenFields lang={lang} />
      {/* Valores enviados ao servidor */}
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="frequency" value={frequency} />
      <input type="hidden" name="amount" value={amount || ""} />
      <input type="hidden" name="destination" value={destination} />
      <input type="hidden" name="name" value={donor.name} />
      <input type="hidden" name="email" value={donor.email} />
      <input type="hidden" name="phone" value={donor.phone} />
      <input type="hidden" name="document" value={donor.document} />
      <input type="hidden" name="method" value={method} />

      {/* Etapas */}
      <ol className="mb-7 grid grid-cols-3 gap-2">
        {d.steps.map((label, i) => (
          <li key={i} className="flex flex-col items-center gap-1.5 text-center">
            <span
              className={`grid size-9 place-items-center rounded-full text-sm font-black transition ${
                i < step ? "bg-leaf-600 text-white" : i === step ? "bg-gold-500 text-navy-900 ring-4 ring-gold-100" : "bg-navy-50 text-navy-900/50"
              }`}
              aria-hidden="true"
            >
              {i < step ? <Check size={18} strokeWidth={3} /> : i + 1}
            </span>
            <span className={`text-[13px] font-bold ${i === step ? "text-navy-900" : "text-muted"}`} aria-current={i === step ? "step" : undefined}>
              {label[lang]}
            </span>
          </li>
        ))}
      </ol>

      {state.ok === false && (
        <div className="mb-5 space-y-2">
          <FormAlert message={state.message} />
          {stepWithError !== null && step !== stepWithError && (
            <button type="button" onClick={() => setStep(stepWithError)} className="text-sm font-bold text-navy-700 underline">
              {d.back[lang]}: {d.steps[stepWithError][lang]}
            </button>
          )}
        </div>
      )}

      {/* ===== Etapa 1: valor ===== */}
      <div hidden={step !== 0} className="space-y-6">
        <fieldset>
          <legend className="field-label">{d.frequency[lang]}</legend>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-navy-50 p-1.5">
            {(Object.keys(d.frequencies) as Frequency[]).map((f) => (
              <label
                key={f}
                className={`cursor-pointer rounded-xl px-3 py-2.5 text-center text-[15px] font-extrabold transition ${
                  frequency === f ? "bg-white text-navy-900 shadow-sm" : "text-navy-900/60 hover:text-navy-900"
                }`}
              >
                <input type="radio" name="_frequency" value={f} checked={frequency === f} onChange={() => setFrequency(f)} className="sr-only" />
                {d.frequencies[f][lang]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="field-label">{d.currency[lang]}</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(d.currencies) as Currency[]).map((c) => (
              <label
                key={c}
                className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                  currency === c ? "border-navy-700 bg-navy-700 text-white" : "border-line bg-white text-navy-900 hover:border-navy-600"
                }`}
              >
                <input type="radio" name="_currency" value={c} checked={currency === c} onChange={() => changeCurrency(c)} className="sr-only" />
                {d.currencies[c][lang]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset aria-describedby={errors.amount ? "e-amount" : undefined}>
          <legend className="field-label">{d.amount[lang]}</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {presets[currency].map((p) => {
              const selected = !custom && amount === p;
              return (
                <label
                  key={p}
                  className={`cursor-pointer rounded-xl border-2 px-3 py-3.5 text-center text-lg font-black transition ${
                    selected ? "border-gold-500 bg-gold-50 text-navy-900" : "border-line bg-white text-navy-900 hover:border-gold-500/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="_amount"
                    value={p}
                    checked={selected}
                    onChange={() => {
                      setAmount(p);
                      setCustom(false);
                    }}
                    className="sr-only"
                  />
                  {money(p)}
                  {frequency === "mensal" && <span className="text-xs font-bold text-muted">{d.perMonth[lang]}</span>}
                </label>
              );
            })}
          </div>
          <div className="mt-3">
            <label htmlFor="f-custom" className="mb-1.5 block text-sm font-bold text-navy-900/80">
              {d.otherAmount[lang]}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted">{currency === "BRL" ? "R$" : "€"}</span>
              <input
                id="f-custom"
                type="number"
                inputMode="decimal"
                min={minAmount[currency]}
                step="1"
                value={custom ? amount || "" : ""}
                onChange={(e) => {
                  setCustom(true);
                  setAmount(Number(e.target.value));
                }}
                onFocus={() => setCustom(true)}
                className="field pl-12"
                aria-invalid={errors.amount ? true : undefined}
                placeholder={String(minAmount[currency] * 10)}
              />
            </div>
          </div>
          {errors.amount && (
            <p id="e-amount" className="field-error">
              {errors.amount}
            </p>
          )}
          {impactIndex >= 0 && !custom && (
            <p className="mt-3 flex items-center gap-2 rounded-xl bg-leaf-50 px-4 py-3 text-[15px] font-semibold text-leaf-700">
              <Heart size={18} className="shrink-0" /> {money(amount)} {d.impact[impactIndex][lang]}
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor="f-destination" className="field-label">
            {d.destination[lang]}
          </label>
          <select id="f-destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="field">
            <option value="geral">{d.destinationGeneral[lang]}</option>
            {areas.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Etapa 2: dados ===== */}
      <div hidden={step !== 1} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label={forms.name[lang]}
            name="_name"
            autoComplete="name"
            value={donor.name}
            onChange={(e) => setDonor({ ...donor, name: e.target.value })}
            error={errors.name}
          />
          <TextField
            label={forms.email[lang]}
            name="_email"
            type="email"
            autoComplete="email"
            value={donor.email}
            onChange={(e) => setDonor({ ...donor, email: e.target.value })}
            error={errors.email}
          />
          <TextField
            label={forms.phone[lang]}
            name="_phone"
            type="tel"
            autoComplete="tel"
            optional={forms.optional[lang]}
            value={donor.phone}
            onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
          />
          <TextField
            label={d.document[lang]}
            name="_document"
            optional={forms.optional[lang]}
            value={donor.document}
            onChange={(e) => setDonor({ ...donor, document: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-3 text-[15px] font-semibold text-navy-900">
          <input type="checkbox" name="anonymous" className="size-5 accent-navy-700" />
          {d.anonymous[lang]}
        </label>
      </div>

      {/* ===== Etapa 3: pagamento ===== */}
      <div hidden={step !== 2} className="space-y-6">
        <fieldset aria-describedby={errors.method ? "e-method" : undefined}>
          <legend className="field-label">{d.method[lang]}</legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {methodsByCurrency[currency].map((m) => {
              const Icon = methodIcon[m];
              const selected = method === m;
              return (
                <label
                  key={m}
                  className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition ${
                    selected ? "border-gold-500 bg-gold-50" : "border-line bg-white hover:border-gold-500/60"
                  }`}
                >
                  <input type="radio" name="_method" value={m} checked={selected} onChange={() => setMethod(m)} className="sr-only" />
                  <Icon size={26} className="text-navy-700" />
                  <span className="text-[15px] font-extrabold text-navy-900">{d.methods[m][lang]}</span>
                  <span className="text-[13px] leading-snug text-muted">{d.methodHints[m][lang]}</span>
                </label>
              );
            })}
          </div>
          {errors.method && (
            <p id="e-method" className="field-error">
              {errors.method}
            </p>
          )}
        </fieldset>

        <div className="rounded-2xl bg-navy-50 p-5">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted">{d.summary[lang]}</p>
          <p className="font-serif text-3xl font-black text-navy-900">
            {money(amount || 0)}
            {frequency === "mensal" && <span className="text-base font-bold text-muted"> {d.perMonth[lang]}</span>}
          </p>
          <p className="mt-1 text-[15px] text-ink/85">
            {d.frequencies[frequency][lang]} · {destination === "geral" ? d.destinationGeneral[lang] : areas.find((a) => a.value === destination)?.label}
          </p>
          <p className="text-[15px] text-ink/85">
            {donor.name} · {donor.email}
          </p>
        </div>

        <Consent lang={lang} error={errors.consent} />
        <p className="flex items-start gap-2 text-sm text-muted">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-leaf-600" /> {d.secure[lang]}
        </p>
      </div>

      {/* Navegação */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn border-2 border-line bg-white text-navy-900 hover:border-navy-600">
            <ArrowLeft size={18} /> {d.back[lang]}
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="submit" className="btn-navy px-7 py-3.5 text-[17px]">
            {d.next[lang]} <ArrowRight size={18} />
          </button>
        ) : (
          <button type="submit" disabled={pending} className="btn-gold px-7 py-3.5 text-[17px]">
            {pending ? (
              <>
                <Loader size={20} className="animate-spin" /> {d.processing[lang]}
              </>
            ) : (
              <>
                {d.confirm[lang]} · {money(amount || 0)} <Heart size={18} />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

function CopyButton({ text, lang }: { text: string; lang: Locale }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch {
          /* navegador sem permissão: o código continua visível para copiar manualmente */
        }
      }}
      className="btn-navy px-4 py-2.5 text-sm"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? d.copied[lang] : d.copy[lang]}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 border-b border-line/70 py-2 last:border-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="font-mono text-[15px] font-bold text-navy-900">{value}</dd>
    </div>
  );
}

function Success({ lang, result, onReset }: { lang: Locale; result: DonationResult; onReset: () => void }) {
  const bank = site.donation;
  return (
    <div role="status" className="space-y-6">
      <div className="text-center">
        <CheckCircle size={56} strokeWidth={1.6} className="mx-auto text-leaf-600" />
        <h2 className="mt-3 font-serif text-2xl font-black text-navy-900 sm:text-3xl">{d.thanks[lang]}</h2>
        <p className="mt-2 text-ink/85">
          {d.registered[lang]} <b className="font-mono text-navy-900">{result.protocol}</b>.
        </p>
        <p className="mt-3 font-serif text-3xl font-black text-gold-700">
          {result.amountLabel}
          {result.frequency === "mensal" && <span className="text-base font-bold text-muted"> {d.perMonth[lang]}</span>}
        </p>
        <p className="text-sm text-muted">
          {d.frequencies[result.frequency][lang]} · {result.destination} · {d.methods[result.method][lang]}
        </p>
      </div>

      {result.method === "pix" && result.pix && (
        <div className="rounded-2xl border border-line p-5">
          <h3 className="mb-1 font-extrabold text-navy-900">{d.pixTitle[lang]}</h3>
          <p className="mb-4 text-sm text-muted">{d.pixHelp[lang]}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element -- QR Code gerado na hora (data URL) */}
            <img src={result.pix.qr} alt="QR Code PIX" width={200} height={200} className="rounded-xl ring-1 ring-line" />
            <div className="w-full min-w-0 flex-1 space-y-3">
              <textarea readOnly value={result.pix.payload} rows={4} className="field font-mono text-xs break-all" aria-label="PIX copia e cola" />
              <CopyButton text={result.pix.payload} lang={lang} />
            </div>
          </div>
        </div>
      )}

      {result.method === "transferencia" && (
        <div className="rounded-2xl border border-line p-5">
          <h3 className="mb-1 font-extrabold text-navy-900">{d.transferTitle[lang]}</h3>
          <p className="mb-3 text-sm text-muted">{d.transferHelp[lang]}</p>
          <dl>
            {result.currency === "BRL" ? (
              <>
                <Row label={d.bank[lang]} value={bank.bankBR.bank} />
                <Row label={d.agency[lang]} value={bank.bankBR.agency} />
                <Row label={d.account[lang]} value={bank.bankBR.account} />
                <Row label={d.holder[lang]} value={bank.bankBR.holder} />
                <Row label="CNPJ" value={bank.bankBR.document.replace("CNPJ ", "")} />
              </>
            ) : (
              <>
                <Row label="IBAN" value={bank.bankEU.iban} />
                <Row label="BIC / SWIFT" value={bank.bankEU.bic} />
                <Row label={d.holder[lang]} value={bank.bankEU.holder} />
              </>
            )}
            <Row label={forms.success.protocol[lang]} value={result.protocol} />
          </dl>
        </div>
      )}

      {result.method === "mbway" && (
        <div className="rounded-2xl border border-line p-5">
          <h3 className="mb-1 font-extrabold text-navy-900">{d.mbwayTitle[lang]}</h3>
          <p className="mb-3 text-sm text-muted">{d.mbwayHelp[lang]}</p>
          <dl>
            <Row label="MB WAY" value={bank.mbway} />
            <Row label={d.amount[lang]} value={result.amountLabel} />
            <Row label={forms.success.protocol[lang]} value={result.protocol} />
          </dl>
        </div>
      )}

      {result.method === "cartao" && (
        <div className="rounded-2xl border border-line p-5">
          <h3 className="mb-1 font-extrabold text-navy-900">{d.cardTitle[lang]}</h3>
          <p className="text-[15px] text-ink/85">{d.cardHelp[lang]}</p>
        </div>
      )}

      {result.frequency === "mensal" && <p className="rounded-xl bg-gold-50 px-4 py-3 text-[15px] font-semibold text-gold-700">{d.monthlyNote[lang]}</p>}

      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onReset} className="btn-outline-gold">
          {d.newDonation[lang]}
        </button>
        <Link href={href(lang, "/projetos")} className="btn-navy">
          {home.ctaProjects[lang]} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
