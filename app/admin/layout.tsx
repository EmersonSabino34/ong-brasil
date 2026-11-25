import type { Metadata } from "next";
import { Merriweather, Nunito_Sans } from "next/font/google";
import "../globals.css";

const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Painel | Infinita Esperança", template: "%s | Painel Infinita Esperança" },
  robots: { index: false, follow: false },
};

/** Layout raiz do painel administrativo (separado do site público, só em português). */
export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="pt-BR" className={`${merriweather.variable} ${nunito.variable} antialiased`}>
      <body className="min-h-dvh bg-[#f3f5f8]">{children}</body>
    </html>
  );
}
