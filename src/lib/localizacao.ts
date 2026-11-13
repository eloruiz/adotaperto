import { useSyncExternalStore } from 'react';
import type { Coordenadas } from './geo';

export type StatusLocalizacao = 'ocioso' | 'buscando' | 'ok' | 'negado';

interface EstadoLocalizacao {
  status: StatusLocalizacao;
  coords: Coordenadas | null;
}

let estado: EstadoLocalizacao = { status: 'ocioso', coords: null };
const ouvintes = new Set<() => void>();

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

function atualizar(novo: Partial<EstadoLocalizacao>) {
  estado = { ...estado, ...novo };
  notificar();
}

/**
 * Solicita a geolocalização uma única vez e compartilha o resultado
 * entre todos os componentes que usam `useLocalizacao`.
 */
export function solicitarLocalizacao(): void {
  if (estado.status === 'buscando' || estado.coords) return;

  if (!('geolocation' in navigator)) {
    atualizar({ status: 'negado' });
    return;
  }

  atualizar({ status: 'buscando' });
  navigator.geolocation.getCurrentPosition(
    (posicao) =>
      atualizar({
        status: 'ok',
        coords: {
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
        },
      }),
    () => atualizar({ status: 'negado' }),
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
}

function assinar(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

function obterSnapshot(): EstadoLocalizacao {
  return estado;
}

export function useLocalizacao(): EstadoLocalizacao {
  return useSyncExternalStore(assinar, obterSnapshot);
}
