import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, ADMIN_LOGIN_PATH, PROTECTED_PATHS, SESSION_COOKIE } from "@/lib/auth/constants";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales } from "@/lib/i18n";

/** Escolhe o idioma: cookie (escolha do visitante) > Accept-Language do navegador > padrão. */
function getLocale(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (hasLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Painel administrativo: fica fora dos idiomas. Sem cookie, vai para a tela de entrada
  // (cada página e ação do painel confere a sessão de verdade).
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname !== ADMIN_LOGIN_PATH && !request.cookies.has(ADMIN_COOKIE)) {
      const login = request.nextUrl.clone();
      login.pathname = ADMIN_LOGIN_PATH;
      login.search = pathname === "/admin" ? "" : `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(login);
    }
    return;
  }

  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) {
    // Área logada: sem cookie de sessão, vai direto para o login (a página confere a sessão de verdade).
    const [, locale, ...rest] = pathname.split("/");
    const page = `/${rest.join("/")}`;
    const isProtected = PROTECTED_PATHS.some((p) => page === p || page.startsWith(`${p}/`));
    if (isProtected && !request.cookies.has(SESSION_COOKIE)) {
      const login = request.nextUrl.clone();
      login.pathname = `/${locale}/entrar`;
      login.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(login);
    }
    return;
  }

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignora arquivos internos do Next, imagens e qualquer caminho com extensão (ex.: /images/x.jpg, /icon.svg).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
