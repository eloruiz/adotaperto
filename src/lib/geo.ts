export interface Coordenadas {
  latitude: number;
  longitude: number;
}

const RAIO_TERRA_KM = 6371;

function paraRadianos(graus: number): number {
  return (graus * Math.PI) / 180;
}

/**
 * Distância em quilômetros entre duas coordenadas (fórmula de Haversine).
 */
export function distanciaKm(a: Coordenadas, b: Coordenadas): number {
  const dLat = paraRadianos(b.latitude - a.latitude);
  const dLon = paraRadianos(b.longitude - a.longitude);
  const lat1 = paraRadianos(a.latitude);
  const lat2 = paraRadianos(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * RAIO_TERRA_KM * Math.asin(Math.sqrt(h));
}

export function formatarDistancia(km: number): string {
  if (km < 1) return `${Math.max(1, Math.round(km * 1000))} m`;
  if (km < 10) return `${km.toFixed(1).replace('.', ',')} km`;
  return `${Math.round(km)} km`;
}

/**
 * Link de rotas do Google Maps até a organização.
 */
export function linkRotaGoogleMaps(destino: Coordenadas): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${destino.latitude},${destino.longitude}`;
}
