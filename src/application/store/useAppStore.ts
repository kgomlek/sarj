/**
 * Store global de l'application
 * Gestion d'état avec Zustand pour la localisation, destination et route
 */

import { create } from 'zustand';
import type { Location, RouteData, Station } from '@domain/types';
import { getRoute } from '@infrastructure/api/mapboxClient';
import { fetchStationsInBounds, fetchNearbyStations } from '@infrastructure/api/ocmClient';

export type ViewMode = 'IDLE' | 'ROUTING' | 'STATION_DETAIL';

interface AppState {
  // State
  userLocation: Location | null;
  destination: Location | null;
  route: RouteData | null;
  stations: Station[];
  nearbyStations: Station[];
  selectedStation: Station | null;
  viewMode: ViewMode;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUserLocation: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
  calculateRoute: () => Promise<void>;
  clearRoute: () => void;
  setError: (error: string | null) => void;
  setSelectedStation: (station: Station | null) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // État initial
  userLocation: null,
  destination: null,
  route: null,
  stations: [],
  nearbyStations: [],
  selectedStation: null,
  viewMode: 'IDLE',
  isLoading: false,
  error: null,

  // Actions
  setUserLocation: async (location) => {
    set({ userLocation: location, error: null });
    
    // Si une destination existe déjà, recalculer la route
    const { destination } = get();
    if (destination) {
      get().calculateRoute();
      return;
    }

    // Sinon, récupérer les stations proches
    if (location) {
      try {
        console.log('📍 Kullanıcı konumu ayarlandı, yakındaki istasyonlar aranıyor...', location);
        const nearbyStations = await fetchNearbyStations(location.lat, location.lng, 20); // Rayon artırıldı 10'dan 20'ye
        console.log('✅ Yakındaki istasyonlar alındı:', nearbyStations.length);
        
        set({ 
          nearbyStations, 
          stations: nearbyStations, // Afficher aussi sur la carte
          viewMode: 'IDLE' 
        });
      } catch (error) {
        console.error('❌ Yakındaki istasyonlar alınamadı:', error);
        // Hata durumunda boş liste ayarla
        set({ 
          nearbyStations: [], 
          stations: [],
          error: error instanceof Error ? error.message : 'Yakındaki istasyonlar bulunamadı'
        });
      }
    }
  },

  setDestination: (location) => {
    set({ destination: location, error: null, viewMode: location ? 'ROUTING' : 'IDLE' });
    // Si une localisation utilisateur existe, calculer automatiquement la route
    const { userLocation } = get();
    if (userLocation && location) {
      get().calculateRoute();
    } else if (!location) {
      // Si on supprime la destination, supprimer aussi la route et revenir aux stations proches
      const { nearbyStations } = get();
      set({ route: null, stations: nearbyStations, viewMode: 'IDLE' });
    }
  },

  calculateRoute: async () => {
    const { userLocation, destination } = get();

    if (!userLocation || !destination) {
      set({ error: 'User location and destination are required to calculate route' });
      return;
    }

    set({ isLoading: true, error: null, selectedStation: null, viewMode: 'ROUTING' });

    try {
      const routeData = await getRoute(userLocation, destination);
      set({ route: routeData });

      // Récupérer les stations de recharge dans la bounding box de la route
      try {
        const [minLng, minLat, maxLng, maxLat] = routeData.bbox;
        const stations = await fetchStationsInBounds(minLat, minLng, maxLat, maxLng);
        set({ stations, isLoading: false });
      } catch (stationError) {
        // Si l'erreur de récupération des stations, on garde la route mais on log l'erreur
        console.warn('Failed to fetch stations:', stationError);
        set({ stations: [], isLoading: false });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to calculate route';
      set({ error: errorMessage, isLoading: false, route: null, stations: [] });
    }
  },

  clearRoute: () => {
    const { nearbyStations } = get();
    set({ 
      route: null, 
      destination: null, 
      error: null, 
      stations: nearbyStations, 
      selectedStation: null,
      viewMode: 'IDLE'
    });
  },

  setError: (error) => {
    set({ error });
  },

  setSelectedStation: (station) => {
    set({ 
      selectedStation: station,
      viewMode: station ? 'STATION_DETAIL' : get().route ? 'ROUTING' : 'IDLE'
    });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },
}));

