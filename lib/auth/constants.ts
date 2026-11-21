/** Nome do cookie da sessão (usado também no proxy.ts, por isso fica num arquivo sem dependências). */
export const SESSION_COOKIE = "ie_sessao";

/** Páginas que exigem login (caminhos sem o prefixo de idioma). */
export const PROTECTED_PATHS = ["/minha-conta"];

/** Regras de senha: mínimo 8 caracteres, com pelo menos uma letra e um número. */
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

export function isStrongEnough(password: string) {
  return (
    password.length >= PASSWORD_MIN &&
    password.length <= PASSWORD_MAX &&
    /\p{L}/u.test(password) &&
    /\d/.test(password)
  );
}

/** Nota de 0 a 3 usada no medidor de força da senha. */
export function passwordScore(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= PASSWORD_MIN) score++;
  if (/\p{L}/u.test(password) && /\d/.test(password)) score++;
  if (password.length >= 12 && (/[^\p{L}\d]/u.test(password) || (/\p{Lu}/u.test(password) && /\p{Ll}/u.test(password)))) score++;
  return score;
}
