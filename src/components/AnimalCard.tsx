import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, PawPrint, Syringe } from 'lucide-react';
import type { Animal } from '../types';
import { dataSource } from '../lib/dataSource';
import { linkWhatsApp, MENSAGEM_INTERESSE_ANIMAL } from '../lib/utils';
import { EspecieBadge } from './EspecieBadge';
import { FavoriteButton } from './FavoriteButton';
import { PetImage } from './PetImage';

export function AnimalCard({ animal }: { animal: Animal }) {
  const org = dataSource.buscarOrganizacaoPorId(animal.organizacaoId);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sand bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/animais/${animal.id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-sand">
          <PetImage
            src={animal.foto}
            alt={`Foto de ${animal.nome}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <EspecieBadge especie={animal.especie} />
          </div>
          <FavoriteButton animalId={animal.id} className="absolute right-3 top-3" />
          {!animal.disponivel && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900/50 backdrop-blur-[2px]">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-stone-700">
                Já adotado
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/animais/${animal.id}`}>
          <h3 className="flex items-center gap-1.5 text-lg font-extrabold text-stone-800">
            <PawPrint className="h-4 w-4 text-coral-500" />
            {animal.nome}
          </h3>
        </Link>
        <p className="text-sm text-stone-500">
          {animal.idade} · {animal.raca ?? 'Sem raça definida'} · {animal.porte}
        </p>
        <p className="flex items-center gap-1 text-sm text-stone-500">
          <MapPin className="h-3.5 w-3.5 text-sage-500" />
          {animal.cidade}
          {org ? ` · ${org.nome}` : ''}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs">
          {animal.vacinado && (
            <span className="flex items-center gap-1 rounded-full bg-sage-50 px-2 py-1 font-semibold text-sage-700">
              <Syringe className="h-3 w-3" /> Vacinado
            </span>
          )}
          {animal.castrado && (
            <span className="rounded-full bg-sand px-2 py-1 font-semibold text-stone-600">
              Castrado
            </span>
          )}
        </div>
        {animal.disponivel && org && (
          <a
            href={linkWhatsApp(org.whatsapp, MENSAGEM_INTERESSE_ANIMAL)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-coral-600"
          >
            <MessageCircle className="h-4 w-4" />
            Tenho interesse
          </a>
        )}
      </div>
    </article>
  );
}
