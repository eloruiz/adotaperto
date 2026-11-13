import { MapPin, PawPrint } from 'lucide-react';
import type { HistoriaAdocao } from '../data/historias';
import { EspecieBadge } from './EspecieBadge';
import { PetImage } from './PetImage';

export function HistoriaCard({ historia }: { historia: HistoriaAdocao }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-sand bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-48 overflow-hidden bg-sand">
        <PetImage
          src={historia.foto}
          alt={`Ilustração de ${historia.animalNome}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <EspecieBadge especie={historia.especie} />
          <span className="rounded-full border border-coral-200 bg-white/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-coral-600 backdrop-blur">
            História fictícia
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="flex items-center gap-1.5 text-lg font-extrabold text-stone-800">
          <PawPrint className="h-4 w-4 text-coral-500" />
          {historia.titulo}
        </h3>
        <p className="flex items-center gap-1 text-xs font-semibold text-stone-400">
          <MapPin className="h-3 w-3" />
          {historia.animalNome} · {historia.cidade}
        </p>
        <p className="text-sm leading-relaxed text-stone-600">{historia.texto}</p>
      </div>
    </article>
  );
}
