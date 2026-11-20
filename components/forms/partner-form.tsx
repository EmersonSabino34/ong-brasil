"use client";

import { useActionState, useState } from "react";
import { sendPartnership, type FormState } from "@/app/actions";
import { forms } from "@/lib/content/forms";
import type { Locale } from "@/lib/i18n";
import { Consent, FormAlert, FormSuccess, HiddenFields, SelectField, SubmitButton, TextArea, TextField } from "./fields";

const initial: FormState = { ok: null };

export function PartnerForm({ lang }: { lang: Locale }) {
  const [round, setRound] = useState(0);
  return <Inner key={round} lang={lang} onReset={() => setRound((r) => r + 1)} />;
}

function Inner({ lang, onReset }: { lang: Locale; onReset: () => void }) {
  const [state, action] = useActionState(sendPartnership, initial);
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

  const countries = Object.entries(forms.countries).map(([value, label]) => ({ value, label: label[lang] }));
  const types = Object.entries(forms.partnerTypes).map(([value, label]) => ({ value, label: label[lang] }));

  return (
    <form action={action} noValidate className="relative space-y-5">
      <HiddenFields lang={lang} />
      {state.ok === false && <FormAlert message={state.message} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label={forms.organization[lang]} name="organization" autoComplete="organization" defaultValue={v.organization} error={e.organization} />
        <TextField label={forms.name[lang]} name="name" autoComplete="name" defaultValue={v.name} error={e.name} />
        <TextField label={forms.email[lang]} name="email" type="email" autoComplete="email" defaultValue={v.email} error={e.email} />
        <TextField label={forms.phone[lang]} name="phone" type="tel" autoComplete="tel" optional={forms.optional[lang]} defaultValue={v.phone} error={e.phone} />
        <SelectField label={forms.country[lang]} name="country" placeholder={forms.select[lang]} options={countries} defaultValue={v.country} error={e.country} />
        <SelectField label={forms.partnerType[lang]} name="type" placeholder={forms.select[lang]} options={types} defaultValue={v.type} error={e.type} />
      </div>
      <TextArea label={forms.partnerMessage[lang]} name="message" defaultValue={v.message} error={e.message} />
      <Consent lang={lang} error={e.consent} />
      <SubmitButton pendingLabel={forms.sending[lang]}>{forms.partnerSend[lang]}</SubmitButton>
    </form>
  );
}
