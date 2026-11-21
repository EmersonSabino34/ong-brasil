/**
 * Limite simples de tentativas, em memória (por processo do servidor).
 * Ex.: 5 senhas erradas para o mesmo e-mail em 15 minutos bloqueiam novas tentativas.
 */
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export function isLimited(key: string, max: number) {
  const entry = buckets.get(key);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    buckets.delete(key);
    return false;
  }
  return entry.count >= max;
}

export function hit(key: string, windowMs: number) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.resetAt < now) buckets.set(key, { count: 1, resetAt: now + windowMs });
  else entry.count++;

  // Limpeza ocasional para o mapa não crescer sem fim.
  if (buckets.size > 5000) for (const [k, e] of buckets) if (e.resetAt < now) buckets.delete(k);
}

export function clear(key: string) {
  buckets.delete(key);
}
