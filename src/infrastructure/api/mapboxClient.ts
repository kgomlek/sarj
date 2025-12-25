/**
 * Client API pour Mapbox Directions
 * Service d'infrastructure pour calculer les routes de navigation
 */

import axios, { type AxiosResponse } from 'axios';
import type { Location, RouteData } from '@domain/types';

/**
 * Réponse brute de l'API Mapbox Directions
 */
interface MapboxDirectionsResponse {
  routes: Array<{
    distance: number; // en mètres
    duration: number; // en secondes
    geometry: {
      coordinates: number[][];
      type: string;
    };
    bbox?: [number, number, number, number];
  }>;
  code: string;
  waypoints: Array<{
    location: [number, number];
    name: string;
  }>;
}

/**
 * Calcule une route entre deux points géographiques
 * @param start Point de départ
 * @param end Point d'arrivée
 * @returns Données de route mappées au type RouteData
 */
export async function getRoute(start: Location, end: Location): Promise<RouteData> {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!accessToken) {
    throw new Error('NEXT_PUBLIC_MAPBOX_TOKEN is not configured');
  }

  try {
    // Format: {lng},{lat};{lng},{lat}
    const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}`;

    const response: AxiosResponse<MapboxDirectionsResponse> = await axios.get(url, {
      params: {
        geometries: 'geojson',
        steps: 'false',
        access_token: accessToken,
      },
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error('No route found between the specified points');
    }

    const route = response.data.routes[0];

    // Calculer le bbox si non fourni par l'API
    let bbox: [number, number, number, number];
    if (route.bbox) {
      bbox = route.bbox;
    } else {
      // Calculer le bbox à partir de la géométrie
      const coordinates = route.geometry.coordinates;
      const lngs = coordinates.map((coord) => coord[0]);
      const lats = coordinates.map((coord) => coord[1]);
      bbox = [
        Math.min(...lngs), // minX
        Math.min(...lats), // minY
        Math.max(...lngs), // maxX
        Math.max(...lats), // maxY
      ];
    }

    const routeData: RouteData = {
      distance: route.distance,
      duration: route.duration,
      geometry: route.geometry,
      bbox,
    };

    return routeData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch route from Mapbox: ${errorMessage}`);
    }
    throw error;
  }
}

