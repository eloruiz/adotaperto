import type { Animal } from '../types';

const estilos: Record<Animal['especie'], string> = {
  cao: 'bg-sage-100 text-sage-800',
  gato: 'bg-coral-100 text-coral-700',
};

const rotulos: Record<Animal['especie'], string> = {
  cao: 'Cão',
  gato: 'Gato',
};

export function EspecieBadge({ especie }: { especie: Animal['especie'] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${estilos[especie]}`}
    >
      {rotulos[especie]}
    </span>
  );
}
