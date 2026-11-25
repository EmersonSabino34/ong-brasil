"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, Eye, EyeOff, Info, Loader, Send } from "@/components/icons";
import { passwordScore } from "@/lib/auth/constants";
import { forms } from "@/lib/content/forms";
import { href, type Locale } from "@/lib/i18n";

type Base = { label: string; name: string; error?: string; optional?: string; hint?: string; className?: string };

function Label({ label, name, optional }: { label: string; name: string; optional?: string }) {
  return (
    <label htmlFor={`f-${name}`} className="field-label">
      {label}
      {optional ? <span className="ml-1 font-semibold text-muted">({optional})</span> : <span className="ml-0.5 text-gold-700" aria-hidden="true">*</span>}
    </label>
  );
}

function Error({ name, error }: { name: string; error?: string }) {
  return error ? (
    <p id={`e-${name}`} className="field-error">
      {error}
    </p>
  ) : null;
}

export function TextField({ label, name, error, optional, hint, className = "", ...props }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label label={label} name={name} optional={optional} />
      <input
        id={`f-${name}`}
        name={name}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `e-${name}` : hint ? `h-${name}` : undefined}
        required={!optional}
        {...props}
      />
      {hint && !error && (
        <p id={`h-${name}`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <Error name={name} error={error} />
    </div>
  );
}

export function TextArea({ label, name, error, optional, className = "", ...props }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label label={label} name={name} optional={optional} />
      <textarea
        id={`f-${name}`}
        name={name}
        rows={5}
        className="field resize-y"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `e-${name}` : undefined}
        required={!optional}
        {...props}
      />
      <Error name={name} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  optional,
  className = "",
  placeholder,
  options,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { placeholder: string; options: { value: string; label: string }[] }) {
  return (
    <div className={className}>
      <Label label={label} name={name} optional={optional} />
      {/* O React não atualiza o defaultValue de um <select> já montado; a key recria o campo para que,
          depois de um erro de validação, o formulário limpo volte com a opção que a pessoa escolheu. */}
      <select
        key={String(props.defaultValue ?? "")}
        id={`f-${name}`}
        name={name}
        className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230b2a4a%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-size-[18px] bg-position-[right_1rem_center] bg-no-repeat pr-10"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `e-${name}` : undefined}
        required={!optional}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Error name={name} error={error} />
    </div>
  );
}

export function Consent({ lang, error, text, defaultChecked }: { lang: Locale; error?: string; text?: string; defaultChecked?: boolean }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-[14.5px] leading-snug text-ink/90">
        <input
          type="checkbox"
          name="consent"
          defaultChecked={defaultChecked}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "e-consent" : undefined}
          className="mt-0.5 size-5 shrink-0 accent-navy-700"
        />
        <span>
          {text ?? forms.consent[lang]}{" "}
          <Link href={href(lang, "/privacidade")} className="font-bold text-navy-700 underline underline-offset-2" target="_blank">
            {forms.consentLink[lang]}
          </Link>
          .
        </span>
      </label>
      <Error name="consent" error={error} />
    </div>
  );
}

/** Campo invisível anti-spam + idioma atual. */
export function HiddenFields({ lang }: { lang: Locale }) {
  return (
    <>
      <input type="hidden" name="lang" value={lang} />
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

export function SubmitButton({
  children,
  pendingLabel,
  className = "",
  icon = <Send size={18} />,
}: {
  children: ReactNode;
  pendingLabel: string;
  className?: string;
  icon?: ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={`btn-gold px-7 py-3.5 text-[17px] ${className}`}>
      {pending ? (
        <>
          <Loader size={20} className="animate-spin" /> {pendingLabel}
        </>
      ) : (
        <>
          {children} {icon}
        </>
      )}
    </button>
  );
}

type PasswordProps = Base &
  InputHTMLAttributes<HTMLInputElement> & {
    labels: { show: string; hide: string };
    /** Texto ao lado do rótulo (ex.: link "Esqueci minha senha"). */
    aside?: ReactNode;
    /** Mostra o medidor de força: rótulo + 3 níveis (fraca, média, forte). */
    strength?: { label: string; levels: string[] };
  };

/** Campo de senha com botão de mostrar/ocultar e, opcionalmente, medidor de força. */
export function PasswordField({ label, name, error, hint, className = "", labels, aside, strength, ...props }: PasswordProps) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  // Depois do envio o React limpa o formulário: zera também o medidor.
  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    const onReset = () => setValue("");
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  const score = passwordScore(value);
  const level = score <= 1 ? 0 : score === 2 ? 1 : 2;
  const colors = ["bg-red-500", "bg-gold-500", "bg-leaf-600"];
  const describedBy = [error ? `e-${name}` : hint ? `h-${name}` : "", strength ? `s-${name}` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <Label label={label} name={name} />
        {aside}
      </div>
      <div className="relative">
        <input
          ref={ref}
          id={`f-${name}`}
          name={name}
          type={visible ? "text" : "password"}
          className="field pr-12"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => setValue(e.target.value)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? labels.hide : labels.show}
          aria-pressed={visible}
          aria-controls={`f-${name}`}
          className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl text-navy-700/70 transition hover:text-navy-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {strength && (
        <div id={`s-${name}`} className="mt-2 flex items-center gap-3" aria-live="polite">
          <div className="grid flex-1 grid-cols-3 gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-1.5 rounded-full transition-colors ${value && i <= level ? colors[level] : "bg-line"}`} />
            ))}
          </div>
          <span className="min-w-20 text-right text-xs font-bold text-muted">
            {value ? (
              <>
                <span className="sr-only">{strength.label}: </span>
                {strength.levels[level]}
              </>
            ) : (
              strength.label
            )}
          </span>
        </div>
      )}
      {hint && !error && (
        <p id={`h-${name}`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <Error name={name} error={error} />
    </div>
  );
}

/** Caixa de seleção simples (ex.: "Manter conectado", newsletter). */
export function Checkbox({ name, label, defaultChecked }: { name: string; label: ReactNode; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-snug text-ink/90">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 size-5 shrink-0 accent-navy-700" />
      <span>{label}</span>
    </label>
  );
}

export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-semibold text-red-700">
      <Info size={20} className="mt-0.5 shrink-0" /> {message}
    </div>
  );
}

export function FormSuccess({ message, protocol, protocolLabel, action }: { message: string; protocol?: string; protocolLabel: string; action?: ReactNode }) {
  return (
    <div role="status" className="rounded-2xl border border-leaf-600/25 bg-leaf-50 p-6 text-center sm:p-8">
      <CheckCircle size={52} strokeWidth={1.6} className="mx-auto text-leaf-600" />
      <p className="mt-4 text-lg font-bold text-navy-900">{message}</p>
      {protocol && (
        <p className="mt-2 text-sm text-muted">
          {protocolLabel}: <b className="font-mono text-base text-navy-900">{protocol}</b>
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
