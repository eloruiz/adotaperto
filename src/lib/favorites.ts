import { useSyncExternalStore } from 'react';

const CHAVE_STORAGE = 'adotaperto:favoritos';

let idsEmCache: string[] | null = null;
const ouvintes = new Set<() => void>();

function carregarIds(): Set<string> {
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE);
    const lista: unknown = bruto ? JSON.parse(bruto) : [];
    if (!Array.isArray(lista)) return new Set();
    return new Set(lista.filter((id): id is string => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

function obterIds(): string[] {
  if (!idsEmCache) idsEmCache = Array.from(carregarIds()).sort();
  return idsEmCache;
}

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function alternarFavorito(id: string): void {
  const ids = new Set(carregarIds());
  if (ids.has(id)) {
    ids.delete(id);
  } else {
    ids.add(id);
  }
  idsEmCache = Array.from(ids).sort();
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(idsEmCache));
  } catch {
    // armazenamento indisponível (ex.: modo privado) — favoritos valem só na sessão
  }
  notificar();
}

function assinar(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

/**
 * Hook que retorna os ids dos animais favoritados, atualizado
 * automaticamente em todos os componentes que o utilizam.
 */
export function useIdsFavoritos(): string[] {
  return useSyncExternalStore(assinar, obterIds);
}
