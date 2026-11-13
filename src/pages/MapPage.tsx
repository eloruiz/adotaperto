import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdoptionMap } from '../components/map/AdoptionMap';
import { FilterBar } from '../components/FilterBar';
import { PageShell } from '../components/Layout';
import { OrgCard } from '../components/OrgCard';
import { dataSource } from '../lib/dataSource';
import type { Filtros } from '../types';

function filtrosDaUrl(searchParams: URLSearchParams): Filtros {
  const especie = searchParams.get('especie');
  return {
    cidade: searchParams.get('cidade') ?? '',
    especie: especie === 'cao' || especie === 'gato' ? especie : 'todos',
  };
}

export function MapPage() {
  const [searchParams] = useSearchParams();
  const [filtros, setFiltros] = useState<Filtros>(() => filtrosDaUrl(searchParams));
  const [paramsAplicados, setParamsAplicados] = useState(() => searchParams.toString());
  const paramsAtuais = searchParams.toString();

  if (paramsAtuais !== paramsAplicados) {
    setParamsAplicados(paramsAtuais);
    setFiltros(filtrosDaUrl(searchParams));
  }

  const orgs = useMemo(() => dataSource.listarOrganizacoes(filtros), [filtros]);
  const cidades = dataSource.listarCidades();

  return (
    <PageShell>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-sage-900">
          Mapa de adoção
        </h1>
        <p className="mt-1 text-stone-500">
          Explore os pontos de adoção (dados fictícios) e clique nos marcadores para ver
          detalhes.
        </p>
      </div>

      <div className="mb-6">
        <FilterBar filtros={filtros} onChange={setFiltros} cidades={cidades} />
      </div>

      {/* Mapa em destaque */}
      <div className="mb-10">
        <AdoptionMap organizacoes={orgs} altura="h-[60vh] min-h-[440px]" />
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-xl font-extrabold tracking-tight text-sage-900">
            Organizações
          </h2>
          <span className="rounded-full bg-sage-100 px-3 py-1 text-sm font-bold text-sage-700">
            {orgs.length} resultado{orgs.length === 1 ? '' : 's'}
          </span>
        </div>
        {orgs.length === 0 ? (
          <p className="rounded-3xl bg-white p-6 text-center text-stone-500 shadow-card">
            Nenhuma organização encontrada para os filtros atuais. Tente outra cidade ou
            remova os filtros.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orgs.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
