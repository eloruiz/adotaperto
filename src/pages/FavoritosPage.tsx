import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, PawPrint } from 'lucide-react';
import { AnimalCard } from '../components/AnimalCard';
import { PageShell } from '../components/Layout';
import { dataSource } from '../lib/dataSource';
import { useIdsFavoritos } from '../lib/favorites';

export function FavoritosPage() {
  const ids = useIdsFavoritos();
  const animais = useMemo(
    () =>
      ids
        .map((id) => dataSource.buscarAnimalPorId(id))
        .filter((a): a is NonNullable<typeof a> => a !== undefined),
    [ids]
  );

  return (
    <PageShell>
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-sage-900">
          <Heart className="h-8 w-8 fill-coral-500 text-coral-500" />
          Meus favoritos
        </h1>
        <p className="mt-1 text-stone-500">
          Animais que você marcou com o coração. Os favoritos ficam salvos apenas
          neste navegador.
        </p>
      </div>

      {animais.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 text-center shadow-card">
          <PawPrint className="h-12 w-12 text-sand-200" />
          <p className="text-stone-500">
            Você ainda não tem favoritos. Explore os animais disponíveis e toque
            no coração para salvar.
          </p>
          <Link
            to="/quero-adotar"
            className="rounded-xl bg-coral-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-coral-600"
          >
            Quero Adotar
          </Link>
        </div>
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
