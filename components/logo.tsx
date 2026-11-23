type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
  /** Mostra só o símbolo, sem o nome */
  markOnly?: boolean;
};


/** Símbolo: laço do infinito dourado + "check" (azul no fundo claro, branco no fundo escuro). */
export function LogoMark({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const check = variant === "dark" ? "#0b2a4a" : "#ffffff";
  return (
    
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`gold-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7c84a" />
          <stop offset="1" stopColor="#d9940c" />
        </linearGradient>
      </defs>
      <path
        d="M60 40C49 22 26 11 13 24 1 36 9 62 30 63c14 .6 23-11 31-22 9-13 25-30 41-25 9 3 11 12 7 20"
        fill="none"
        stroke={`url(#gold-${variant})`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M27 74c11 5 24 4 34-3" fill="none" stroke={`url(#gold-${variant})`} strokeWidth="4" strokeLinecap="round" />
      <path d="M70 46 83 62 113 22" fill="none" stroke={check} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ variant = "dark", className = "", markOnly = false }: LogoProps) {
  const text = variant === "dark" ? "text-navy-900" : "text-white";
  const sub = variant === "dark" ? "text-navy-900/80" : "text-white/80";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className="h-10 w-auto shrink-0 sm:h-[58px] xl:h-[70px]" />
      {!markOnly && (
        <span className={`flex flex-col leading-none ${text}`}>
          <span className="font-serif text-[1.15rem] font-black tracking-tight sm:text-[1.7rem] xl:text-[2.05rem]">Infinita</span>
          <span className="-mt-0.5 font-serif text-[1.15rem] font-black tracking-tight sm:text-[1.7rem] xl:text-[2.05rem]">Esperança</span>
          <span className={`mt-1 text-[0.6rem] font-bold tracking-[0.55em] sm:text-[0.68rem] ${sub}`}>ONG</span>
        </span>
      )}
    </span>
  );
}
