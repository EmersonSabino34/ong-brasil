import Link from "next/link";
import { LogoMark } from "@/components/logo";

export default function AdminNotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <LogoMark className="mx-auto h-16 w-auto" />
        <h1 className="mt-5 font-serif text-2xl font-black text-navy-900">Página do painel não encontrada</h1>
        <p className="mt-2 text-muted">O endereço pode ter mudado ou o registro foi removido.</p>
        <Link href="/admin" className="btn-navy mt-6 px-5 py-3">
          Voltar ao painel
        </Link>
      </div>
    </main>
  );
}
