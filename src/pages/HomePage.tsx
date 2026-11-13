import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Map, PawPrint, Search, ShieldCheck } from 'lucide-react';
import { AdoptionMap } from '../components/map/AdoptionMap';
import { AnimalCard } from '../components/AnimalCard';
import { FilterBar } from '../components/FilterBar';
import { HistoriaCard } from '../components/HistoriaCard';
import { OrgCard } from '../components/OrgCard';
import { PageShell } from '../components/Layout';
import { dataSource } from '../lib/dataSource';
import { historiasFicticias } from '../data/historias';
import type { Filtros } from '../types';

const filtrosIniciais: Filtros = { cidade: '', especie: 'todos' };

export function HomePage() {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);
  const orgs = dataSource.listarOrganizacoes(filtros);
  const animais = dataSource.listarAnimais(filtros);
  const cidades = dataSource.listarCidades();
  const orgsDestaque = orgs.slice(0, 3);
  const animaisDestaque = animais.filter((a) => a.disponivel).slice(0, 4);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-sage-700 via-sage-600 to-sage-800 px-6 py-16 text-center text-white shadow-soft sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sage-300/20 blur-3xl"
          aria-hidden
        />
        <PawPrint className="relative mx-auto mb-5 h-12 w-12 text-coral-300" />
        <h1 className="relative text-3xl font-extrabold tracking-tight sm:text-5xl">
          Encontre um novo lar
          <br />
          para um <span className="text-coral-300">pet</span> perto de você
        </h1>
        <p className="relative mx-auto mt-4 max-w-2xl text-base text-sage-100 sm:text-lg">
          Descubra ONGs, abrigos e animais disponíveis para adoção na sua cidade.
          Dados fictícios nesta demonstração.
        </p>
        <div className="relative mx-auto mt-8 max-w-xl text-left">
          <div className="rounded-3xl bg-white/95 p-4 text-stone-800 shadow-xl backdrop-blur">
            <FilterBar filtros={filtros} onChange={setFiltros} cidades={cidades} />
            <div className="mt-3 flex justify-center">
              <Link
                to={`/mapa?cidade=${encodeURIComponent(filtros.cidade)}&especie=${filtros.especie}`}
                className="flex items-center gap-2 rounded-xl bg-coral-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-coral-600"
              >
                <Search className="h-4 w-4" />
                Ver no mapa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mb-14 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Search, titulo: 'Busque', texto: 'Filtre por cidade e escolha cães ou gatos.' },
          { icon: Map, titulo: 'Explore', texto: 'Veja ONGs e abrigos no mapa interativo.' },
          { icon: Heart, titulo: 'Adote', texto: 'Fale com a organização pelo WhatsApp.' },
        ].map(({ icon: Icon, titulo, texto }) => (
          <div
            key={titulo}
            className="flex flex-col items-center gap-2 rounded-3xl border border-sand bg-white p-6 text-center shadow-card"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-extrabold text-stone-800">{titulo}</h3>
            <p className="text-sm text-stone-500">{texto}</p>
          </div>
        ))}
      </section>

      {/* Mapa resumo */}
      <section className="mb-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-sage-900">
            Pontos de adoção no mapa
          </h2>
          <Link
            to="/mapa"
            className="flex items-center gap-1 text-sm font-bold text-sage-700 hover:text-coral-600"
          >
            Abrir mapa completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <AdoptionMap organizacoes={orgs} altura="h-[420px]" />
      </section>

      {/* ONGs */}
      <section className="mb-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-sage-900">
            ONGs e abrigos
          </h2>
          <Link
            to="/abrigos"
            className="flex items-center gap-1 text-sm font-bold text-sage-700 hover:text-coral-600"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {orgsDestaque.length === 0 ? (
          <p className="rounded-3xl bg-white p-6 text-center text-stone-500 shadow-card">
            Nenhum resultado para os filtros atuais.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orgsDestaque.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        )}
      </section>

      {/* Animais */}
      <section className="mb-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-sage-900">
            Animais disponíveis
          </h2>
          <Link
            to="/quero-adotar"
            className="flex items-center gap-1 text-sm font-bold text-sage-700 hover:text-coral-600"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {animaisDestaque.length === 0 ? (
          <p className="rounded-3xl bg-white p-6 text-center text-stone-500 shadow-card">
            Nenhum animal disponível para os filtros atuais.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {animaisDestaque.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {/* Histórias de adoção */}
      <section className="mb-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-sage-900">
            Histórias de adoção
          </h2>
          <Link
            to="/historias"
            className="flex items-center gap-1 text-sm font-bold text-sage-700 hover:text-coral-600"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mb-5 text-sm text-stone-500">
          Histórias fictícias criadas para demonstração do protótipo.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {historiasFicticias.map((historia) => (
            <HistoriaCard key={historia.id} historia={historia} />
          ))}
        </div>
      </section>

      {/* Aviso */}
      <section className="flex items-start gap-3 rounded-3xl border border-coral-200 bg-coral-50 p-5 text-sm text-coral-700">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          <strong>Atenção:</strong> este é um protótipo com dados fictícios. Organizações,
          endereços, telefones e fotos não correspondem a locais ou animais reais. A
          integração com dados reais (Supabase) está prevista para a próxima etapa.
        </p>
      </section>
    </PageShell>
  );
}
