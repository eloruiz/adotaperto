export type Especie = 'cao' | 'gato';

export type TipoOrganizacao = 'ong' | 'abrigo' | 'associacao' | 'clinica';

export interface Organizacao {
  id: string;
  nome: string;
  tipo: TipoOrganizacao;
  cidade: string;
  estado: string;
  endereco: string;
  latitude: number;
  longitude: number;
  descricao: string;
  telefone: string;
  whatsapp: string; // apenas dígitos, com DDI, ex.: 5511999999999
  email?: string;
  horario?: string;
  site?: string;
}

export interface Animal {
  id: string;
  nome: string;
  especie: Especie;
  raca?: string;
  idade: string;
  porte: 'pequeno' | 'medio' | 'grande';
  genero: 'macho' | 'femea';
  castrado: boolean;
  vacinado: boolean;
  descricao: string;
  foto: string;
  organizacaoId: string;
  cidade: string;
  disponivel: boolean;
}

export type FiltroEspecie = 'todos' | Especie;
export type FiltroIdade = 'todos' | 'filhote' | 'jovem' | 'adulto' | 'senior';
export type FiltroPorte = 'todos' | Animal['porte'];
export type FiltroDisponibilidade = 'todos' | 'disponiveis' | 'adotados';

export interface Filtros {
  cidade: string;
  especie: FiltroEspecie;
}

export interface FiltrosAdocao {
  especie: FiltroEspecie;
  idade: FiltroIdade;
  porte: FiltroPorte;
  disponibilidade: FiltroDisponibilidade;
}
