import type { Animal, Filtros, FiltrosAdocao, Organizacao } from '../types';
import { animaisFicticios, organizacoesFicticias } from '../data/mockData';
import { faixaEtaria, normalizar } from './utils';

/**
 * Camada de acesso a dados do AdotaPerto.
 *
 * TODO(Supabase): substitua as implementações abaixo por queries reais,
 * ex.: `supabase.from('organizacoes').select('*')`, mantendo as mesmas
 * assinaturas. Componentes devem consumir apenas esta interface.
 */

function filtrarOrganizacoes(filtros: Filtros): Organizacao[] {
  const cidade = normalizar(filtros.cidade.trim());
  return organizacoesFicticias.filter((org) => {
    const bateCidade =
      cidade === '' || normalizar(org.cidade).includes(cidade) || normalizar(org.estado).includes(cidade);
    const temEspecie =
      filtros.especie === 'todos' ||
      animaisFicticios.some((a) => a.organizacaoId === org.id && a.especie === filtros.especie);
    return bateCidade && temEspecie;
  });
}

function filtrarAnimais(filtros: Filtros): Animal[] {
  const cidade = normalizar(filtros.cidade.trim());
  return animaisFicticios.filter((animal) => {
    const bateCidade = cidade === '' || normalizar(animal.cidade).includes(cidade);
    const bateEspecie = filtros.especie === 'todos' || animal.especie === filtros.especie;
    return bateCidade && bateEspecie;
  });
}

function filtrarAnimaisAdocao(filtros: FiltrosAdocao): Animal[] {
  return animaisFicticios.filter((animal) => {
    if (filtros.especie !== 'todos' && animal.especie !== filtros.especie) return false;
    if (filtros.idade !== 'todos' && faixaEtaria(animal.idade) !== filtros.idade) return false;
    if (filtros.porte !== 'todos' && animal.porte !== filtros.porte) return false;
    if (filtros.disponibilidade === 'disponiveis' && !animal.disponivel) return false;
    if (filtros.disponibilidade === 'adotados' && animal.disponivel) return false;
    return true;
  });
}

export const dataSource = {
  listarOrganizacoes: filtrarOrganizacoes,
  listarAnimais: filtrarAnimais,
  listarAnimaisAdocao: filtrarAnimaisAdocao,
  buscarOrganizacaoPorId: (id: string) => organizacoesFicticias.find((o) => o.id === id),
  buscarAnimalPorId: (id: string) => animaisFicticios.find((a) => a.id === id),
  listarCidades: () => Array.from(new Set(organizacoesFicticias.map((o) => o.cidade))).sort(),
};
