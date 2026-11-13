import { Loader2, MapPin, Navigation } from 'lucide-react';
import type { Organizacao } from '../types';
import { distanciaKm, formatarDistancia, linkRotaGoogleMaps } from '../lib/geo';
import { solicitarLocalizacao, useLocalizacao } from '../lib/localizacao';

interface PertoDeMimProps {
  org: Organizacao;
  className?: string;
}

/**
 * Botão "Perto de mim": solicita geolocalização (uma vez, compartilhada
 * entre componentes), calcula a distância em linha reta até a organização
 * e oferece rota pelo Google Maps.
 */
export function PertoDeMim({ org, className = '' }: PertoDeMimProps) {
  const { status, coords } = useLocalizacao();

  if (status === 'ok' && coords) {
    const distancia = distanciaKm(coords, org);
    return (
      <span className={`flex flex-wrap items-center gap-2 ${className}`}>
        <span className="flex items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1.5 text-xs font-bold text-sage-700">
          <MapPin className="h-3.5 w-3.5" />
          A ~{formatarDistancia(distancia)}
        </span>
        <a
          href={linkRotaGoogleMaps(org)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-sand-200 px-3 py-1.5 text-xs font-bold text-sage-800 transition hover:bg-sand"
        >
          <Navigation className="h-3.5 w-3.5" />
          Como chegar
        </a>
      </span>
    );
  }

  return (
    <span className={`flex flex-col gap-1 ${className}`}>
      <button
        type="button"
        onClick={solicitarLocalizacao}
        disabled={status === 'buscando'}
        className="flex w-fit items-center gap-1.5 rounded-full border border-sage-200 bg-white px-3 py-1.5 text-xs font-bold text-sage-700 transition hover:bg-sage-50 disabled:cursor-wait disabled:opacity-60"
      >
        {status === 'buscando' ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <MapPin className="h-3.5 w-3.5" />
        )}
        {status === 'buscando' ? 'Localizando...' : 'Perto de mim'}
      </button>
      {status === 'negado' && (
        <span className="text-[11px] text-stone-400">
          Localização não autorizada neste navegador.
        </span>
      )}
    </span>
  );
}
