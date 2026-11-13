import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShieldCheck } from 'lucide-react';
import { HistoriaCard } from '../components/HistoriaCard';
import { PageShell } from '../components/Layout';
import { historiasFicticias } from '../data/historias';

export function HistoriasPage() {
  return (
    <PageShell>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-sage-900 sm:text-4xl">
          Histórias de adoção
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-stone-500">
          Relatos inspiradores de animais que encontraram um lar.{' '}
          <strong className="text-coral-600">
            Todas as histórias desta página são fictícias
          </strong>{' '}
          — nomes, lugares e acontecimentos foram criados para demonstração.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {historiasFicticias.map((historia) => (
          <HistoriaCard key={historia.id} historia={historia} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-[2rem] border border-sand bg-white p-8 text-center shadow-card">
        <Heart className="h-10 w-10 text-coral-500" />
        <p className="max-w-xl text-stone-600">
          Sua história de adoção pode ser a próxima. Conheça os animais
          disponíveis e escolha quem vai conquistar o seu coração.
        </p>
        <Link
          to="/quero-adotar"
          className="flex items-center gap-2 rounded-2xl bg-coral-500 px-6 py-3 font-bold text-white shadow-soft transition hover:bg-coral-600"
        >
          Quero Adotar
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-stone-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        Conteúdo ilustrativo do protótipo — nenhuma história é real.
      </p>
    </PageShell>
  );
}
