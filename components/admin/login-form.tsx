"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { adminSignIn, type AdminLoginState } from "@/app/admin/actions";
import { FormAlert, PasswordField, SubmitButton, TextField } from "@/components/forms/fields";
import { LogIn } from "@/components/icons";

export function AdminLoginForm() {
  const [state, action] = useActionState<AdminLoginState, FormData>(adminSignIn, {});
  const next = useSearchParams().get("next") ?? "";
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next} />
      <FormAlert message={state.error} />
      <TextField label="E-mail" name="email" type="email" autoComplete="username" defaultValue={state.email} autoFocus />
      <PasswordField label="Senha" name="password" autoComplete="current-password" labels={{ show: "Mostrar senha", hide: "Ocultar senha" }} />
      <SubmitButton pendingLabel="Entrando…" className="w-full" icon={<LogIn size={19} />}>
        Entrar no painel
      </SubmitButton>
    </form>
  );
}
