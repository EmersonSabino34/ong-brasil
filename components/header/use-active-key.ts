"use client";

import { usePathname } from "next/navigation";

/** Descobre qual item do menu está ativo a partir da URL (/pt/projetos/x -> "projetos"). */
export function useActiveKey() {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/")[2] ?? "";
  if (segment === "") return "inicio";
  if (segment === "doe") return "como-ajudar";
  return segment;
}
