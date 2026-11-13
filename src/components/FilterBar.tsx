import { Search } from 'lucide-react';
import type { Filtros, FiltroEspecie } from '../types';

interface FilterBarProps {
  filtros: Filtros;
  onChange: (filtros: Filtros) => void;
  cidades: string[];
}

const opcoesEspecie: { valor: FiltroEspecie; rotulo: string }[] = [
  { valor: 'todos', rotulo: 'Cães e gatos' },
  { valor: 'cao', rotulo: 'Cães' },
  { valor: 'gato', rotulo: 'Gatos' },
];

export function FilterBar({ filtros, onChange, cidades }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-sand-200 bg-white p-3 shadow-card sm:flex-row sm:items-center sm:p-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-400" />
        <input
          type="text"
          list="lista-cidades"
          placeholder="Buscar por cidade..."
          aria-label="Buscar por cidade"
          value={filtros.cidade}
          onChange={(e) => onChange({ ...filtros, cidade: e.target.value })}
          className="w-full rounded-xl border border-transparent bg-cream/70 py-2.5 pl-10 pr-3 text-sm font-medium text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-sage-300 focus:bg-white focus:ring-4 focus:ring-sage-100"
        />
        <datalist id="lista-cidades">
          {cidades.map((cidade) => (
            <option key={cidade} value={cidade} />
          ))}
        </datalist>
      </div>
      <div className="flex rounded-xl bg-sand/60 p-1">
        {opcoesEspecie.map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            onClick={() => onChange({ ...filtros, especie: opcao.valor })}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all ${
              filtros.especie === opcao.valor
                ? 'bg-sage-700 text-white shadow-sm'
                : 'text-stone-600 hover:text-sage-700'
            }`}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}
