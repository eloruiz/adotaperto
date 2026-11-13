import { Link } from 'react-router-dom';
import { ArrowLeft, PawPrint, SearchX } from 'lucide-react';
import { PageShell } from '../components/Layout';

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-sand bg-white px-6 py-16 text-center shadow-card">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sand text-sage-600">
          <SearchX className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-sage-900">
            Página não encontrada
          </h1>
          <p className="mt-1 text-stone-500">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-sage-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sage-800"
          >
            <PawPrint className="h-4 w-4" />
            Voltar ao início
          </Link>
          <Link
            to="/quero-adotar"
            className="flex items-center gap-2 rounded-xl border border-sand-200 px-5 py-2.5 text-sm font-bold text-sage-800 transition hover:bg-sand"
          >
            <ArrowLeft className="h-4 w-4" />
            Quero Adotar
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
