import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  HeartHandshake,
  Home,
  PawPrint,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import { PageShell } from '../components/Layout';

const secoes = [
  {
    id: 'porque',
    titulo: 'Por que adotar?',
    icon: HeartHandshake,
    itens: [
      'Você salva uma vida: muitos animais esperam por uma família há meses.',
      'Adoção é gratuidade — você não compra um animal, você muda o destino dele.',
      'Cães e gatos adotados tendem a ser mais gratos e a criar laços profundos.',
      'Você ajuda a combater o abandono e a superlotação dos abrigos.',
    ],
  },
  {
    id: 'antes',
    titulo: 'Antes de adotar: perguntas essenciais',
    icon: ClipboardCheck,
    itens: [
      'Tenho tempo e dinheiro para alimentação, vacinas e emergências veterinárias?',
      'Meu espaço (casa/apartamento) é adequado ao porte e à energia do animal?',
      'Se eu alugar, o contrato permite animais de estimação?',
      'Toda a família está de acordo com a decisão?',
      'Estou preparado para o período de adaptação, que pode levar semanas?',
    ],
  },
  {
    id: 'primeiros-dias',
    titulo: 'Primeiros dias em casa',
    icon: Home,
    itens: [
      'Reserve um cantinho tranquilo com cama, água e comedouro.',
      'Deixe o animal explorar o novo ambiente no seu ritmo, sem forçar contato.',
      'Mantenha a rotina de alimentação e passeios sempre que possível.',
      'Tenha paciência com latidos, miados ou escondidos — é normal.',
      'Se possível, leve o animal ao veterinário para uma avaliação inicial.',
    ],
  },
  {
    id: 'cuidados',
    titulo: 'Cuidados essenciais',
    icon: Stethoscope,
    itens: [
      'Vacinação em dia: veterinário orienta o calendário correto.',
      'Castragem: reduz doenças e comportamento indesejado.',
      'Vermifugação regular e antipulgas/protetor contra carrapatos.',
      'Alimentação adequada à idade e ao porte — evite comida humana.',
      'Passeios e brincadeiras diárias para cães; estímulo para gatos.',
    ],
  },
];

const mitos = [
  {
    mito: '"Animal adulto não se apega."',
    verdade: 'Animais adultos adotados costumam ser mais calmos e agradecidos — e o vínculo é igualmente forte.',
  },
  {
    mito: '"Cão que roeu tapete nunca vai mudar."',
    verdade: 'Com rotina, brinquedos e paciência, a maioria dos comportamentos melhora muito.',
  },
  {
    mito: '"Gato não precisa de atenção."',
    verdade: 'Gatos precisam de brincadeiras, carinho e um ambiente enriquecido — e retribuem muito.',
  },
];

export function GuiaPage() {
  return (
    <PageShell>
      <div className="mb-10 text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
          <BookOpen className="h-7 w-7" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-sage-900 sm:text-4xl">
          Guia de adoção responsável
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-stone-500">
          Adotar é uma decisão de 10 a 15 anos. Confira os pontos essenciais
          antes de abrir as portas de casa para um novo membro da família.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {secoes.map(({ id, titulo, icon: Icon, itens }) => (
          <section
            key={id}
            id={id}
            className="rounded-[2rem] border border-sand bg-white p-6 shadow-card sm:p-7"
          >
            <h2 className="mb-4 flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-sage-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100 text-sage-700">
                <Icon className="h-5 w-5" />
              </span>
              {titulo}
            </h2>
            <ul className="flex flex-col gap-3">
              {itens.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-600">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Mitos e verdades */}
      <section className="mt-10 rounded-[2rem] border border-sand bg-white p-6 shadow-card sm:p-7">
        <h2 className="mb-5 flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-sage-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral-50 text-coral-600">
            <PawPrint className="h-5 w-5" />
          </span>
          Mitos e verdades sobre adoção
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {mitos.map(({ mito, verdade }) => (
            <div
              key={mito}
              className="rounded-2xl border border-sand bg-cream/60 p-4"
            >
              <p className="text-sm font-extrabold text-stone-700">{mito}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{verdade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vacinas */}
      <section className="mt-10 flex items-start gap-4 rounded-[2rem] border border-sand bg-sage-50 p-6 sm:p-7">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sage-700 shadow-card">
          <Syringe className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-sage-900">
            Vacinação importa — inclusive para você
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            Manter as vacinas do seu pet em dia protege a família inteira. O
            calendário vacinal correto depende da idade e da região — converse
            sempre com um médico-veterinário.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 text-center">
        <Link
          to="/quero-adotar"
          className="inline-flex items-center gap-2 rounded-2xl bg-coral-500 px-7 py-3.5 font-bold text-white shadow-soft transition hover:bg-coral-600"
        >
          Quero Adotar
          <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-3 text-xs text-stone-400">
          Conteúdo educativo geral — em caso de dúvidas de saúde, procure um
          veterinário.
        </p>
      </section>
    </PageShell>
  );
}
