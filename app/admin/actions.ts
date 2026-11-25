"use server";

import { headers } from "next/headers";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfig, checkAdminCredentials, endAdminSession, requireAdmin, startAdminSession } from "@/lib/admin/auth";
import { ADMIN_LOGIN_PATH } from "@/lib/auth/constants";
import { clear, hit, isLimited } from "@/lib/auth/rate-limit";
import { str } from "@/lib/form-data";
import { isStatus, updateSubmission } from "@/lib/submissions";

export type AdminLoginState = { error?: string; email?: string };

const FIFTEEN_MIN = 15 * 60 * 1000;

/** Só volta para páginas do próprio painel depois do login. */
function safeNext(raw: string) {
  if (!raw.startsWith("/admin") || raw.startsWith("//") || raw.includes("\\") || raw.startsWith(ADMIN_LOGIN_PATH)) return "/admin";
  return raw;
}

export async function adminSignIn(_prev: AdminLoginState, data: FormData): Promise<AdminLoginState> {
  const email = str(data, "email", 200).toLowerCase();
  const password = String(data.get("password") ?? "");

  if (!adminConfig().ready) {
    return { email, error: "O acesso ainda não foi configurado: defina ADMIN_EMAIL e ADMIN_PASSWORD (veja o README)." };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  const key = `admin:${ip}`;
  if (isLimited(key, 5)) return { email, error: "Muitas tentativas. Aguarde 15 minutos e tente de novo." };

  if (!checkAdminCredentials(email, password)) {
    hit(key, FIFTEEN_MIN);
    await new Promise((r) => setTimeout(r, 400)); // atrasa quem tenta adivinhar a senha
    return { email, error: "E-mail ou senha incorretos." };
  }

  clear(key);
  await startAdminSession();
  redirect(safeNext(str(data, "next", 300)));
}

export async function adminSignOut() {
  await endAdminSession();
  redirect(`${ADMIN_LOGIN_PATH}?saiu=1`);
}

export type StatusState = { ok?: boolean; error?: string; savedAt?: number };

/** Salva o andamento e a anotação interna de um envio. */
export async function saveStatus(_prev: StatusState, data: FormData): Promise<StatusState> {
  await requireAdmin();
  const protocol = str(data, "protocol", 40);
  const status = str(data, "status", 20);
  const note = str(data, "note", 4000);
  if (!protocol || !isStatus(status)) return { error: "Escolha um andamento válido." };
  try {
    if (!(await updateSubmission(protocol, { status, note }))) return { error: "Envio não encontrado." };
  } catch (error) {
    console.error("[admin] erro ao salvar andamento", error);
    return { error: "Não foi possível salvar agora. Tente de novo." };
  }
  refresh();
  return { ok: true, savedAt: Date.now() };
}
