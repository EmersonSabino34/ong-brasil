"use client";

import { useActionState } from "react";
import { saveStatus, type StatusState } from "@/app/admin/actions";
import { FormAlert, SubmitButton } from "@/components/forms/fields";
import { Check } from "@/components/icons";
import { statusInfo, submissionStatuses, type SubmissionStatus } from "@/lib/statuses";

/** Andamento + anotação interna (só a equipe vê). */
export function StatusForm({ protocol, status, note }: { protocol: string; status: SubmissionStatus; note: string }) {
  const [state, action] = useActionState<StatusState, FormData>(saveStatus, {});
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="protocol" value={protocol} />
      <fieldset>
        <legend className="field-label">Andamento</legend>
        <div className="grid grid-cols-2 gap-2">
          {submissionStatuses.map((st) => (
            <label
              key={st}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[14.5px] font-bold text-navy-900 transition has-checked:border-navy-600 has-checked:bg-navy-50 has-checked:ring-2 has-checked:ring-navy-600/15"
            >
              <input type="radio" name="status" value={st} defaultChecked={st === status} className="accent-navy-700" />
              {statusInfo[st].label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="field-label">Anotação interna</span>
        <textarea name="note" rows={4} defaultValue={note} maxLength={4000} placeholder="Ex.: liguei dia 12, combinamos a entrega no sábado." className="field" />
        <span className="mt-1 block text-xs text-muted">Só a equipe vê. A pessoa não recebe nada.</span>
      </label>
      <FormAlert message={state.error} />
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton pendingLabel="Salvando…" icon={<Check size={18} />} className="px-6! py-3! text-base!">
          Salvar andamento
        </SubmitButton>
        {state.ok && (
          <span key={state.savedAt} role="status" className="text-sm font-bold text-leaf-700">
            Salvo!
          </span>
        )}
      </div>
    </form>
  );
}
