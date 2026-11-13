import { useMemo, useState } from 'react';
import { PawPrint } from 'lucide-react';
import { AdocaoFilterBar } from '../components/AdocaoFilterBar';
import { AnimalCard } from '../components/AnimalCard';
import { PageShell } from '../components/Layout';
import { dataSource } from '../lib/dataSource';
import type { FiltrosAdocao } from '../types';

const filtrosIniciais: FiltrosAdocao = {
  especie: 'todos',
  idade: 'todos',
  porte: 'todos',
  disponibilidade: 'todos',
};

export function QueroAdotarPage() {
  const [filtros, setFiltros] = useState<FiltrosAdocao>(filtrosIniciais);
  const animais = useMemo(() => dataSource.listarAnimaisAdocao(filtros), [filtros]);

  return (
    <PageShell>
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-sage-900">
          <PawPrint className="h-8 w-8 text-coral-500" />
          Quero Adotar
        </h1>
        <p className="mt-1 text-stone-500">
          Conheça os animais disponíveis para adoção (dados fictícios neste
          protótipo) e filtre pela sua preferida.
        </p>
      </div>

      <div className="mb-8">
        <AdocaoFilterBar filtros={filtros} onChange={setFiltros} />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xl font-extrabold tracking-tight text-sage-900">
          Animais
        </h2>
        <span className="rounded-full bg-sage-100 px-3 py-1 text-sm font-bold text-sage-700">
          {animais.length} resultado{animais.length === 1 ? '' : 's'}
        </span>
      </div>

      {animais.length === 0 ? (
        <p className="rounded-3xl bg-white p-6 text-center text-stone-500 shadow-card">
          Nenhum animal encontrado para os filtros atuais. Tente ajustar os
          critérios ou volte a mostrar todos.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {animais.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
