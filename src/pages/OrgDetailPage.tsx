import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { AdoptionMap } from '../components/map/AdoptionMap';
import { AnimalCard } from '../components/AnimalCard';
import { PageShell } from '../components/Layout';
import { PertoDeMim } from '../components/PertoDeMim';
import { dataSource } from '../lib/dataSource';
import { linkSite, linkTelefone, linkWhatsApp, MENSAGEM_CONTATO_ORG } from '../lib/utils';

const rotulosTipo: Record<string, string> = {
  ong: 'ONG',
  abrigo: 'Abrigo',
  associacao: 'Associação',
  clinica: 'Clínica',
};

export function OrgDetailPage() {
  const { id } = useParams<{ id: string }>();
  const org = id ? dataSource.buscarOrganizacaoPorId(id) : undefined;

  if (!org) {
    return (
      <PageShell>
        <p className="rounded-3xl bg-white p-8 text-center text-stone-500 shadow-card">
          Organização não encontrada.{' '}
          <Link to="/abrigos" className="font-bold text-sage-700 underline">
            Ver todas as organizações
          </Link>
        </p>
      </PageShell>
    );
  }

  const animais = dataSource
    .listarAnimais({ cidade: '', especie: 'todos' })
    .filter((a) => a.organizacaoId === org.id);

  return (
    <PageShell>
      <Link
        to="/abrigos"
        className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-stone-500 transition hover:text-sage-700"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="mb-8 rounded-[2rem] border border-sand bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-bold text-sage-700">
                {rotulosTipo[org.tipo]}
              </span>
              <span className="rounded-full border border-coral-200 bg-coral-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-coral-600">
                Dados fictícios
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sage-900">
              {org.nome}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-stone-500">
              <MapPin className="h-4 w-4 text-sage-500" />
              {org.endereco}, {org.cidade}/{org.estado}
            </p>
            <PertoDeMim org={org} className="mt-3" />
          </div>
          <a
            href={linkWhatsApp(org.whatsapp, MENSAGEM_CONTATO_ORG)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-soft transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-5 w-5" />
            Contato via WhatsApp
          </a>
        </div>
        <p className="mt-4 max-w-3xl text-stone-600">{org.descricao}</p>

        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <a
            href={linkTelefone(org.telefone)}
            className="flex items-center gap-2 text-stone-600 transition hover:text-sage-700"
          >
            <Phone className="h-4 w-4 text-sage-600" /> {org.telefone}
          </a>
          {org.email && (
            <a
              href={`mailto:${org.email}`}
              className="flex items-center gap-2 text-stone-600 transition hover:text-sage-700"
            >
              <Mail className="h-4 w-4 text-sage-600" /> {org.email}
            </a>
          )}
          {org.horario && (
            <p className="flex items-center gap-2 text-stone-600">
              <Clock className="h-4 w-4 text-sage-600" /> {org.horario}
            </p>
          )}
          {org.site && (
            <a
              href={linkSite(org.site)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-stone-600 transition hover:text-sage-700"
            >
              <Globe className="h-4 w-4 text-sage-600" /> {org.site}
            </a>
          )}
        </div>
      </div>

      <div className="mb-10">
        <AdoptionMap organizacoes={[org]} altura="h-[320px]" />
      </div>

      <section>
        <h2 className="mb-4 text-xl font-extrabold tracking-tight text-sage-900">
          Animais desta organização ({animais.length})
        </h2>
        {animais.length === 0 ? (
          <p className="rounded-3xl bg-white p-6 text-center text-stone-500 shadow-card">
            Nenhum animal cadastrado nesta organização fictícia.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {animais.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
