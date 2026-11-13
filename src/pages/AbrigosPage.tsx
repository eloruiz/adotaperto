import { useMemo, useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { PageShell } from '../components/Layout';
import { OrgCard } from '../components/OrgCard';
import { dataSource } from '../lib/dataSource';
import type { Filtros } from '../types';

const filtrosIniciais: Filtros = { cidade: '', especie: 'todos' };

export function AbrigosPage() {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);
  const orgs = useMemo(() => dataSource.listarOrganizacoes(filtros), [filtros]);
  const cidades = dataSource.listarCidades();

  return (
    <PageShell>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-sage-900">
          ONGs, abrigos e associações
        </h1>
        <p className="mt-1 text-stone-500">
          Organizações fictícias cadastradas no protótipo, para demonstrar a interface.
        </p>
      </div>
      <div className="mb-6">
        <FilterBar filtros={filtros} onChange={setFiltros} cidades={cidades} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orgs.map((org) => (
          <OrgCard key={org.id} org={org} />
        ))}
      </div>
      {orgs.length === 0 && (
        <p className="mt-6 rounded-3xl bg-white p-6 text-center text-stone-500 shadow-card">
          Nenhuma organização encontrada para os filtros atuais.
        </p>
      )}
    </PageShell>
  );
}
