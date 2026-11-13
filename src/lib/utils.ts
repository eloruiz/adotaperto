import type { FiltroIdade } from '../types';

/**
 * Normaliza texto para comparação: minúsculas, sem acentos.
 */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Monta o link do WhatsApp (wa.me) a partir de um telefone com DDI.
 * Aceita apenas dígitos no campo `whatsapp` (ex.: "5511999999999").
 */
export function linkWhatsApp(whatsapp: string, mensagem?: string): string {
  const numero = whatsapp.replace(/\D/g, '');
  const base = `https://wa.me/${numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export type FaixaEtaria = Exclude<FiltroIdade, 'todos'>;

/**
 * Converte a idade em texto livre (ex.: "6 meses", "2 anos") em uma faixa etária.
 */
export function faixaEtaria(idade: string): FaixaEtaria {
  const meses = idade.match(/(\d+)\s*mes/);
  const anos = idade.match(/(\d+)\s*ano/);
  const totalMeses = meses
    ? Number(meses[1])
    : anos
      ? Number(anos[1]) * 12
      : Number.NaN;

  if (Number.isNaN(totalMeses)) return 'adulto';
  if (totalMeses < 12) return 'filhote';
  if (totalMeses < 48) return 'jovem';
  if (totalMeses < 96) return 'adulto';
  return 'senior';
}

export function linkTelefone(telefone: string): string {
  return `tel:${telefone.replace(/\D/g, '')}`;
}

export function linkSite(site: string): string {
  return site.startsWith('http') ? site : `https://${site}`;
}

export const MENSAGEM_INTERESSE_ANIMAL =
  'Olá! Vim pelo site AdotaPerto e tenho interesse em saber mais sobre um animal para adoção.';

export const MENSAGEM_CONTATO_ORG =
  'Olá! Vim pelo site AdotaPerto e gostaria de mais informações.';
