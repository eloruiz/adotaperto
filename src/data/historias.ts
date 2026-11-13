import type { Especie } from '../types';

/**
 * Histórias de adoção FICTÍCIAS — criadas apenas para demonstrar a
 * identidade visual do AdotaPerto. Nenhuma pessoa, animal ou evento
 * descrito aqui é real.
 */
export interface HistoriaAdocao {
  id: string;
  animalNome: string;
  especie: Especie;
  cidade: string;
  titulo: string;
  texto: string;
  foto: string;
}

export const historiasFicticias: HistoriaAdocao[] = [
  {
    id: 'hist-1',
    animalNome: 'Bidu',
    especie: 'cao',
    cidade: 'São Paulo',
    titulo: 'De vira-lata de rua a rei da casa',
    texto: 'Bidu (nome fictício) foi encontrado magro e assustado por uma ONG de exemplo. Em três meses de adaptação, virou o cão mais animado do prédio — e agora "trabalha" recebendo carinho de vizinhos.',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hist-2',
    animalNome: 'Mel',
    especie: 'gato',
    cidade: 'Rio de Janeiro',
    titulo: 'A gatinha que escolheu a família',
    texto: 'Mel (nome fictício) chegou tímida e se escondia embaixo da cama. Com paciência e rotina, hoje dorme no colo da família toda noite — prova de que confiança se constrói devagar.',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hist-3',
    animalNome: 'Nina',
    especie: 'gato',
    cidade: 'Porto Alegre',
    titulo: 'Sênior também tem segunda chance',
    texto: 'Nina (nome fictício) tinha 8 anos quando foi adotada. Animais seniors costumam ser mais calmos e prontos para o colo — e retribuem cada gesto com afeto dobrado.',
    foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
  },
];
