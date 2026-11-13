import { Heart } from 'lucide-react';
import { alternarFavorito, useIdsFavoritos } from '../lib/favorites';

interface FavoriteButtonProps {
  animalId: string;
  className?: string;
}

export function FavoriteButton({ animalId, className = '' }: FavoriteButtonProps) {
  const ids = useIdsFavoritos();
  const ativo = ids.includes(animalId);

  return (
    <button
      type="button"
      aria-label={ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={ativo}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        alternarFavorito(animalId);
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-card backdrop-blur transition hover:scale-110 ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition ${
          ativo ? 'fill-coral-500 text-coral-500' : 'text-stone-500'
        }`}
      />
    </button>
  );
}
