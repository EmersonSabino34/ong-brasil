import { getAdmin } from "@/lib/admin/auth";
import { dateTime, fields, isKindSlug, kindInfo } from "@/lib/admin/labels";
import { listUsers } from "@/lib/auth/users";
import { forms } from "@/lib/content/forms";
import { statusInfo } from "@/lib/statuses";
import { allSubmissions } from "@/lib/submissions";

/**
 * Planilha (CSV) para abrir no Excel / Google Planilhas.
 * Separador ";" e marca UTF-8 no início, para o Excel em português abrir com acentos e colunas certas.
 */

function cell(value: unknown) {
  let text = String(value ?? "").replace(/\r?\n/g, " ");
  // Evita que o Excel interprete o conteúdo como fórmula.
  if (/^[=+\-@\t]/.test(text)) text = `'${text}`;
  return /[";]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csv(rows: unknown[][]) {
  return "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n");
}

export async function GET(_request: Request, ctx: RouteContext<"/admin/exportar/[tipo]">) {
  if (!(await getAdmin())) return new Response("Acesso restrito.", { status: 401 });
  const { tipo } = await ctx.params;
  const stamp = new Date().toISOString().slice(0, 10);
  let rows: unknown[][];

  if (tipo === "apoiadores") {
    const users = await listUsers();
    rows = [
      ["Nome", "E-mail", "Telefone", "País", "Idioma", "Recebe novidades", "Cadastro", "Último acesso"],
      ...users.map((u) => [
        u.name,
        u.email,
        u.phone,
        u.country in forms.countries ? forms.countries[u.country as keyof typeof forms.countries].pt : u.country,
        u.lang,
        u.newsletter ? "Sim" : "Não",
        dateTime(u.createdAt),
        dateTime(u.lastLoginAt),
      ]),
    ];
  } else if (isKindSlug(tipo)) {
    const records = await allSubmissions([kindInfo[tipo].kind]);
    const labels = records.length ? fields(records[0]).map((f) => f.label) : [];
    rows = [
      ["Protocolo", "Recebido em", "Andamento", "Anotação interna", ...labels],
      ...records.map((r) => [r.protocol, dateTime(r.receivedAt), statusInfo[r.status].label, r.note, ...fields(r).map((f) => f.value)]),
    ];
  } else {
    return new Response("Tipo desconhecido.", { status: 404 });
  }

  return new Response(csv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="infinita-esperanca-${tipo}-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
