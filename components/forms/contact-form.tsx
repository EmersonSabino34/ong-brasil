"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { sendContact, type FormState } from "@/app/actions";
import { forms } from "@/lib/content/forms";
import type { Locale } from "@/lib/i18n";
import { Consent, FormAlert, FormSuccess, HiddenFields, SelectField, SubmitButton, TextArea, TextField } from "./fields";

const initial: FormState = { ok: null };

/** Formulário de contato. Aceita ?assunto=itens (ou outro) na URL para já vir com o assunto escolhido. */
export function ContactForm({ lang }: { lang: Locale }) {
  const [round, setRound] = useState(0);
  const subject = useSearchParams().get("assunto") ?? "";
  return <ContactFormInner key={`${round}-${subject}`} lang={lang} defaultSubject={subject} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({ lang, defaultSubject, onReset }: { lang: Locale; defaultSubject: string; onReset: () => void }) {
  const [state, action] = useActionState(sendContact, initial);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <FormSuccess
        message={state.message!}
        protocol={state.protocol}
        protocolLabel={forms.success.protocol[lang]}
        action={
          <button type="button" onClick={onReset} className="btn-outline-gold">
            {forms.sendAnother[lang]}
          </button>
        }
      />
    );
  }

  const subjects = Object.entries(forms.contactSubjects).map(([value, label]) => ({ value, label: label[lang] }));

  return (
    <form action={action} noValidate className="relative space-y-5">
      <HiddenFields lang={lang} />
      {state.ok === false && <FormAlert message={state.message} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label={forms.name[lang]} name="name" autoComplete="name" defaultValue={v.name} error={e.name} />
        <TextField label={forms.email[lang]} name="email" type="email" autoComplete="email" defaultValue={v.email} error={e.email} />
        <TextField
          label={forms.phone[lang]}
          name="phone"
          type="tel"
          autoComplete="tel"
          optional={forms.optional[lang]}
          defaultValue={v.phone}
          error={e.phone}
        />
        <SelectField
          label={forms.subject[lang]}
          name="subject"
          placeholder={forms.select[lang]}
          options={subjects}
          defaultValue={v.subject ?? (defaultSubject in forms.contactSubjects ? defaultSubject : "")}
          error={e.subject}
        />
      </div>
      <TextArea label={forms.message[lang]} name="message" defaultValue={v.message} error={e.message} />
      <Consent lang={lang} error={e.consent} />
      <SubmitButton pendingLabel={forms.sending[lang]}>{forms.send[lang]}</SubmitButton>
    </form>
  );
}
