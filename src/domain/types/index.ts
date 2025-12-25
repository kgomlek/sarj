/**
 * Types de domaine pour l'application EV Route Planning
 * Types purs TypeScript - Aucune dépendance externe
 */

/**
 * Représente une localisation géographique
 */
export interface Location {
  lat: number;
  lng: number;
}

/**
 * Type de chargeur disponible dans une station
 */
export interface ChargerType {
  id: number;
  title: string;
  kw: number | null;
}

/**
 * Statut opérationnel d'une station de recharge
 */
export type StationStatus = 'Operational' | 'Unknown' | 'Offline';

/**
 * Station de recharge EV
 */
export interface Station {
  id: string | number;
  title: string;
  address: string | null;
  location: Location;
  connectors: ChargerType[];
  status: StationStatus;
  usageCost: string | null;
}

/**
 * Données de route calculée
 */
export interface RouteData {
  distance: number; // en mètres
  duration: number; // en secondes
  geometry: any; // Objet GeoJSON de Mapbox
  bbox: [number, number, number, number]; // [minX, minY, maxX, maxY]
}

