import { NavLink } from 'react-router-dom';
import { BookOpen, Building2, Dog, Heart, Map, PawPrint } from 'lucide-react';
import { useIdsFavoritos } from '../lib/favorites';

const links = [
  { to: '/', label: 'Início', icon: PawPrint },
  { to: '/quero-adotar', label: 'Quero Adotar', icon: Dog },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/abrigos', label: 'Abrigos e ONGs', icon: Building2 },
  { to: '/guia', label: 'Guia', icon: BookOpen },
];

export function Navbar() {
  const idsFavoritos = useIdsFavoritos();

  return (
    <header className="sticky top-0 z-[1000] border-b border-sand bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-sage-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-white">
            <PawPrint className="h-5 w-5" />
          </span>
          Adota<span className="text-coral-500">Perto</span>
        </NavLink>
        <div className="flex items-center gap-1 rounded-full border border-sand bg-cream/60 p-1 sm:gap-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-sage-700 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-sand'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
        <NavLink
          to="/favoritos"
          aria-label={`Favoritos (${idsFavoritos.length})`}
          className={({ isActive }) =>
            `relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isActive
                ? 'bg-coral-500 text-white'
                : 'text-stone-600 hover:bg-sand'
            }`
          }
        >
          <Heart
            className={`h-5 w-5 ${idsFavoritos.length > 0 ? 'fill-current' : ''}`}
          />
          {idsFavoritos.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-coral-500 px-1 text-[10px] font-extrabold text-white">
              {idsFavoritos.length}
            </span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}
