import { Link } from 'react-router-dom';
import { Clock, MapPin, MessageCircle } from 'lucide-react';
import type { Organizacao } from '../types';
import { linkWhatsApp, MENSAGEM_CONTATO_ORG } from '../lib/utils';
import { PertoDeMim } from './PertoDeMim';

const rotulosTipo: Record<Organizacao['tipo'], string> = {
  ong: 'ONG',
  abrigo: 'Abrigo',
  associacao: 'Associação',
  clinica: 'Clínica',
};

export function OrgCard({ org }: { org: Organizacao }) {
  return (
    <article className="flex flex-col gap-3 rounded-3xl border border-sand bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-bold text-sage-700">
            {rotulosTipo[org.tipo]}
          </span>
          <h3 className="mt-1.5 text-lg font-extrabold leading-snug text-stone-800">
            <Link to={`/organizacoes/${org.id}`} className="hover:text-sage-700">
              {org.nome}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-coral-600">
            {org.cidade}/{org.estado}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-coral-200 bg-coral-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-coral-600">
          Exemplo
        </span>
      </div>
      <p className="text-sm leading-relaxed text-stone-600">{org.descricao}</p>
      <p className="flex items-start gap-1.5 text-sm text-stone-500">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
        {org.endereco}
      </p>
      {org.horario && (
        <p className="flex items-center gap-1.5 text-sm text-stone-500">
          <Clock className="h-4 w-4 shrink-0 text-sage-500" />
          {org.horario}
        </p>
      )}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <a
          href={linkWhatsApp(org.whatsapp, MENSAGEM_CONTATO_ORG)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to={`/organizacoes/${org.id}`}
          className="rounded-xl border border-sand-200 px-4 py-2 text-sm font-bold text-sage-800 transition hover:bg-sand"
        >
          Ver detalhes
        </Link>
        <PertoDeMim org={org} className="basis-full" />
      </div>
    </article>
  );
}
