"use client";

import { useActionState, useState } from "react";
import { sendVolunteer, type FormState } from "@/app/actions";
import { forms } from "@/lib/content/forms";
import type { Locale } from "@/lib/i18n";
import { Consent, FormAlert, FormSuccess, HiddenFields, SelectField, SubmitButton, TextArea, TextField } from "./fields";

const initial: FormState = { ok: null };

export function VolunteerForm({ lang }: { lang: Locale }) {
  const [round, setRound] = useState(0);
  return <Inner key={round} lang={lang} onReset={() => setRound((r) => r + 1)} />;
}

function Inner({ lang, onReset }: { lang: Locale; onReset: () => void }) {
  const [state, action] = useActionState(sendVolunteer, initial);
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const chosen = new Set((v.areas ?? "").split(",").filter(Boolean));

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
  const availability = Object.entries(forms.availabilityOptions).map(([value, label]) => ({ value, label: label[lang] }));

  return (
    <form action={action} noValidate className="relative space-y-5">
      <HiddenFields lang={lang} />
      {state.ok === false && <FormAlert message={state.message} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label={forms.name[lang]} name="name" autoComplete="name" defaultValue={v.name} error={e.name} />
        <TextField label={forms.email[lang]} name="email" type="email" autoComplete="email" defaultValue={v.email} error={e.email} />
        <TextField label={forms.phone[lang]} name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} />
        <SelectField label={forms.country[lang]} name="country" placeholder={forms.select[lang]} options={countries} defaultValue={v.country} error={e.country} />
        <TextField label={forms.city[lang]} name="city" autoComplete="address-level2" defaultValue={v.city} error={e.city} />
        <SelectField
          label={forms.availability[lang]}
          name="availability"
          placeholder={forms.select[lang]}
          options={availability}
          defaultValue={v.availability}
          error={e.availability}
        />
      </div>

      <fieldset aria-describedby={e.areas ? "e-areas" : undefined}>
        <legend className="field-label">
          {forms.volunteerAreasLabel[lang]} <span className="text-gold-700" aria-hidden="true">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(forms.volunteerAreas).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-semibold text-navy-900 transition has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50"
            >
              <input type="checkbox" name="areas" value={value} defaultChecked={chosen.has(value)} className="size-5 accent-navy-700" />
              {label[lang]}
            </label>
          ))}
        </div>
        {e.areas && (
          <p id="e-areas" className="field-error">
            {e.areas}
          </p>
        )}
      </fieldset>

      <TextArea
        label={forms.volunteerMessage[lang]}
        name="message"
        optional={forms.optional[lang]}
        defaultValue={v.message}
        error={e.message}
      />
      <Consent lang={lang} error={e.consent} />
      <SubmitButton pendingLabel={forms.sending[lang]}>{forms.volunteerSend[lang]}</SubmitButton>
    </form>
  );
}
