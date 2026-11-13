import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Ruler,
  Syringe,
} from 'lucide-react';
import { AnimalCard } from '../components/AnimalCard';
import { PageShell } from '../components/Layout';
import { EspecieBadge } from '../components/EspecieBadge';
import { linkTelefone } from '../lib/utils';
import { FavoriteButton } from '../components/FavoriteButton';
import { PetImage } from '../components/PetImage';
import { TenhoInteresseForm } from '../components/TenhoInteresseForm';
import { dataSource } from '../lib/dataSource';

export function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const animal = id ? dataSource.buscarAnimalPorId(id) : undefined;

  if (!animal) {
    return (
      <PageShell>
        <p className="rounded-3xl bg-white p-8 text-center text-stone-500 shadow-card">
          Animal não encontrado.{' '}
          <Link to="/" className="font-bold text-sage-700 underline">
            Voltar ao início
          </Link>
        </p>
      </PageShell>
    );
  }

  const org = dataSource.buscarOrganizacaoPorId(animal.organizacaoId);
  const outros = dataSource
    .listarAnimais({ cidade: '', especie: 'todos' })
    .filter((a) => a.id !== animal.id && a.especie === animal.especie)
    .slice(0, 4);

  return (
    <PageShell>
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-stone-500 transition hover:text-sage-700"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-sand bg-white shadow-card">
          <PetImage
            src={animal.foto}
            alt={`Foto de ${animal.nome}`}
            className="h-80 w-full object-cover sm:h-[28rem]"
            loading="eager"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <EspecieBadge especie={animal.especie} />
              {animal.disponivel ? (
                <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-bold text-sage-800">
                  Disponível para adoção
                </span>
              ) : (
                <span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-bold text-stone-600">
                  Indisponível
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-sage-900">
                <PawPrint className="h-7 w-7 text-coral-500" />
                {animal.nome}
              </h1>
              <FavoriteButton animalId={animal.id} />
            </div>
            <p className="mt-1 text-stone-500">
              {animal.raca ?? 'Sem raça definida'} ·{' '}
              {animal.genero === 'macho' ? 'Macho' : 'Fêmea'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { icon: Calendar, texto: animal.idade },
              { icon: Ruler, texto: `Porte ${animal.porte}` },
              { icon: Syringe, texto: animal.vacinado ? 'Vacinado' : 'Não vacinado' },
              { icon: PawPrint, texto: animal.castrado ? 'Castrado' : 'Não castrado' },
            ].map(({ icon: Icon, texto }) => (
              <div
                key={texto}
                className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-card"
              >
                <Icon className="h-4 w-4 shrink-0 text-sage-600" /> {texto}
              </div>
            ))}
          </div>

          <p className="text-stone-600">{animal.descricao}</p>

          {org && (
            <div className="rounded-3xl border border-sand bg-white p-5 shadow-card">
              <h2 className="font-extrabold text-sage-900">Onde encontrar</h2>
              <p className="mt-1 text-sm font-semibold text-stone-700">{org.nome}</p>
              <p className="mt-2 flex items-start gap-1.5 text-sm text-stone-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
                {org.endereco}, {org.cidade}/{org.estado}
              </p>
              <a
                href={linkTelefone(org.telefone)}
                className="mt-1 flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-sage-700"
              >
                <Phone className="h-4 w-4 shrink-0 text-sage-500" /> {org.telefone}
              </a>
              {org.email && (
                <a
                  href={`mailto:${org.email}`}
                  className="mt-1 flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-sage-700"
                >
                  <Mail className="h-4 w-4 shrink-0 text-sage-500" /> {org.email}
                </a>
              )}
            </div>
          )}

          {animal.disponivel && org && <TenhoInteresseForm animal={animal} org={org} />}
        </div>
      </div>

      {outros.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-extrabold tracking-tight text-sage-900">
            Outros {animal.especie === 'cao' ? 'cães' : 'gatos'} disponíveis
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outros.map((a) => (
              <AnimalCard key={a.id} animal={a} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
