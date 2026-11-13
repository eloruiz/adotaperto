import { Heart, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto bg-sage-900 text-sage-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2 text-lg font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-500 text-white">
            <Heart className="h-4 w-4" />
          </span>
          Adota<span className="text-coral-400">Perto</span>
        </div>
        <p className="max-w-xl text-sm text-sage-300">
          Ajudando pessoas a encontrar um novo lar para cães e gatos. Projeto demonstrativo
          com dados fictícios.
        </p>
        <p className="flex items-center gap-1 text-xs text-sage-400">
          <MapPin className="h-3 w-3" />
          Mapa: © OpenStreetMap contributors
        </p>
      </div>
    </footer>
  );
}
