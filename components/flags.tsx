type FlagProps = { className?: string; title?: string };

const base = "inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-xs ring-1 ring-black/10";

export function FlagBR({ className = "", title = "Brasil" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={`${base} ${className}`} role="img" aria-label={title}>
      <rect width="20" height="14" fill="#009c3b" />
      <path d="M10 1.6 18.4 7 10 12.4 1.6 7Z" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.3" fill="#002776" />
      <path d="M6.9 6.4c2.1-.5 4.4-.1 6.3 1.1" stroke="#fff" strokeWidth=".6" fill="none" />
    </svg>
  );
}

export function FlagPT({ className = "", title = "Portugal" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={`${base} ${className}`} role="img" aria-label={title}>
      <rect width="20" height="14" fill="#da291c" />
      <rect width="8" height="14" fill="#046a38" />
      <circle cx="8" cy="7" r="3" fill="none" stroke="#ffe000" strokeWidth="1.1" />
      <path d="M6.7 5.3h2.6v2.4a1.3 1.3 0 0 1-2.6 0z" fill="#fff" stroke="#da291c" strokeWidth=".5" />
    </svg>
  );
}

export function FlagBE({ className = "", title = "Bélgica" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={`${base} ${className}`} role="img" aria-label={title}>
      <rect width="6.67" height="14" fill="#000" />
      <rect x="6.67" width="6.67" height="14" fill="#fdda24" />
      <rect x="13.33" width="6.67" height="14" fill="#ef3340" />
    </svg>
  );
}

export const flags = { br: FlagBR, pt: FlagPT, be: FlagBE };
export type CountryCode = keyof typeof flags;
