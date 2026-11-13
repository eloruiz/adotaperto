import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Organizacao } from '../../types';

const iconePata = L.divIcon({
  className: 'icone-pata',
  html: `<div style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:#f9683f;border:3px solid #fff;border-radius:9999px;box-shadow:0 4px 10px rgba(55,66,42,.35);font-size:18px">🐾</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

function AjustarViewport({ organizacoes }: { organizacoes: Organizacao[] }) {
  const map = useMap();
  useEffect(() => {
    if (organizacoes.length === 0) {
      map.setView([-14.235, -51.925], 4);
      return;
    }
    const bounds = L.latLngBounds(organizacoes.map((o) => [o.latitude, o.longitude]));
    map.fitBounds(bounds.pad(0.15));
  }, [organizacoes, map]);
  return null;
}

interface AdoptionMapProps {
  organizacoes: Organizacao[];
  altura?: string;
}

export function AdoptionMap({ organizacoes, altura = 'h-[500px]' }: AdoptionMapProps) {
  return (
    <div
      className={`relative z-0 w-full overflow-hidden rounded-3xl border border-sand-200 shadow-card ${altura}`}
    >
      <MapContainer
        center={[-14.235, -51.925]}
        zoom={4}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AjustarViewport organizacoes={organizacoes} />
        {organizacoes.map((org) => (
          <Marker key={org.id} position={[org.latitude, org.longitude]} icon={iconePata}>
            <Popup>
              <div className="min-w-[190px] font-sans">
                <p className="font-extrabold text-stone-800">{org.nome}</p>
                <p className="text-xs text-stone-500">
                  {org.cidade}/{org.estado} · {org.endereco}
                </p>
                <Link
                  to={`/organizacoes/${org.id}`}
                  className="mt-1 inline-block text-sm font-bold text-sage-700 underline"
                >
                  Ver detalhes
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
