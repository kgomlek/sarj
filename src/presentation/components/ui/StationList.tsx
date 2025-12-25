'use client';

/**
 * Composant de liste des stations de recharge
 * Affiche une liste scrollable de cartes de stations
 */

import type { Station } from '@domain/types';
import { MapPin, Zap, ChevronRight } from 'lucide-react';

interface StationListProps {
  stations: Station[];
  onSelect: (station: Station) => void;
  userLocation?: { lat: number; lng: number } | null;
}

/**
 * Calcule la distance entre deux points en kilomètres (formule de Haversine)
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formate la distance pour l'affichage
 */
function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
}

export default function StationList({
  stations,
  onSelect,
  userLocation,
}: StationListProps) {
  // Calculer les distances si la position utilisateur est disponible
  const stationsWithDistance = stations.map((station) => {
    let distance: number | null = null;
    if (userLocation) {
      distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        station.location.lat,
        station.location.lng
      );
    }
    return { station, distance };
  });

  // Trier par distance si disponible
  stationsWithDistance.sort((a, b) => {
    if (a.distance === null && b.distance === null) return 0;
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });

  if (stations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <MapPin className="h-12 w-12 text-gray-400" />
        <p className="text-center text-gray-500">
          Yakınlarda şarj istasyonu bulunamadı
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {stationsWithDistance.map(({ station, distance }) => {
        // Extraire les types de connecteurs
        const connectorTypes = station.connectors
          .map((c) => c.title)
          .filter(Boolean)
          .slice(0, 3) // Limiter à 3 types
          .join(', ');

        // Obtenir la puissance maximale
        const maxPower = station.connectors.reduce((max, connector) => {
          return connector.kw && connector.kw > max ? connector.kw : max;
        }, 0);

        return (
          <div
            key={station.id}
            onClick={() => onSelect(station)}
            className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md active:scale-[0.98]"
          >
            {/* Icône de station */}
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                station.status === 'Operational'
                  ? 'bg-green-100'
                  : station.status === 'Offline'
                  ? 'bg-red-100'
                  : 'bg-gray-100'
              }`}
            >
              <Zap
                className={`h-6 w-6 ${
                  station.status === 'Operational'
                    ? 'text-green-600'
                    : station.status === 'Offline'
                    ? 'text-red-600'
                    : 'text-gray-400'
                }`}
              />
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
              <h3 className="truncate text-base font-bold text-gray-900">
                {station.title}
              </h3>
              
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                {distance !== null && (
                  <span className="font-medium text-blue-600">
                    {formatDistance(distance)}
                  </span>
                )}
                {connectorTypes && (
                  <span className="truncate">{connectorTypes}</span>
                )}
                {maxPower > 0 && (
                  <span className="font-semibold text-gray-700">
                    {maxPower}kW
                  </span>
                )}
              </div>

              {/* Adresse */}
              {station.address && (
                <p className="mt-1 truncate text-xs text-gray-500">
                  {station.address}
                </p>
              )}
            </div>

            {/* Bouton d'action */}
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
          </div>
        );
      })}
    </div>
  );
}

