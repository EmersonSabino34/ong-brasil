import { readSession } from "./session";
import { findUserById } from "./users";

/** Dados do usuário que as páginas podem mostrar (nunca inclui senha nem tokens). */
export type CurrentUser = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  phone: string;
  country: string;
  newsletter: boolean;
  createdAt: string;
  lastLoginAt?: string;
};

/**
 * Usuário conectado na requisição atual, ou null.
 * Confere a assinatura do cookie, a validade e se a senha não foi trocada depois do login.
 * Lê cookies: com Cache Components, quem chama precisa estar dentro de um <Suspense>.
 *
 * "use cache: private": o resultado fica só no navegador desta pessoa (nunca num cache do servidor)
 * e é reaproveitado dentro da mesma requisição (cabeçalho + página leem a sessão uma vez só).
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  "use cache: private";
  const session = await readSession();
  if (!session) return null;
  const user = await findUserById(session.uid);
  if (!user || user.sessionVersion !== session.v) return null;
  return {
    id: user.id,
    name: user.name,
    firstName: user.name.split(/\s+/)[0] ?? user.name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    newsletter: user.newsletter,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
}
