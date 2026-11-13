import type {
  FiltroDisponibilidade,
  FiltroEspecie,
  FiltroIdade,
  FiltroPorte,
  FiltrosAdocao,
} from '../types';

interface AdocaoFilterBarProps {
  filtros: FiltrosAdocao;
  onChange: (filtros: FiltrosAdocao) => void;
}

interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
}

function GrupoChips<T extends string>({
  rotulo,
  opcoes,
  valor,
  onSelect,
}: {
  rotulo: string;
  opcoes: Opcao<T>[];
  valor: T;
  onSelect: (valor: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-stone-400">
        {rotulo}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {opcoes.map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            onClick={() => onSelect(opcao.valor)}
            aria-pressed={valor === opcao.valor}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
              valor === opcao.valor
                ? 'bg-sage-700 text-white shadow-sm'
                : 'bg-sand/60 text-stone-600 hover:bg-sand hover:text-sage-700'
            }`}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}

const opcoesEspecie: Opcao<FiltroEspecie>[] = [
  { valor: 'todos', rotulo: 'Cães e gatos' },
  { valor: 'cao', rotulo: 'Cães' },
  { valor: 'gato', rotulo: 'Gatos' },
];

const opcoesIdade: Opcao<FiltroIdade>[] = [
  { valor: 'todos', rotulo: 'Todas' },
  { valor: 'filhote', rotulo: 'Filhotes' },
  { valor: 'jovem', rotulo: 'Jovens' },
  { valor: 'adulto', rotulo: 'Adultos' },
  { valor: 'senior', rotulo: 'Seniores' },
];

const opcoesPorte: Opcao<FiltroPorte>[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'pequeno', rotulo: 'Pequeno' },
  { valor: 'medio', rotulo: 'Médio' },
  { valor: 'grande', rotulo: 'Grande' },
];

const opcoesDisponibilidade: Opcao<FiltroDisponibilidade>[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'disponiveis', rotulo: 'Disponíveis' },
  { valor: 'adotados', rotulo: 'Já adotados' },
];

export function AdocaoFilterBar({ filtros, onChange }: AdocaoFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-sand bg-white p-4 shadow-card sm:p-5">
      <GrupoChips
        rotulo="Espécie"
        opcoes={opcoesEspecie}
        valor={filtros.especie}
        onSelect={(especie) => onChange({ ...filtros, especie })}
      />
      <GrupoChips
        rotulo="Idade"
        opcoes={opcoesIdade}
        valor={filtros.idade}
        onSelect={(idade) => onChange({ ...filtros, idade })}
      />
      <GrupoChips
        rotulo="Porte"
        opcoes={opcoesPorte}
        valor={filtros.porte}
        onSelect={(porte) => onChange({ ...filtros, porte })}
      />
      <GrupoChips
        rotulo="Disponibilidade"
        opcoes={opcoesDisponibilidade}
        valor={filtros.disponibilidade}
        onSelect={(disponibilidade) => onChange({ ...filtros, disponibilidade })}
      />
    </div>
  );
}
