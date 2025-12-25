/**
 * Client API pour Open Charge Map
 * Service d'infrastructure pour récupérer les stations de recharge EV
 */

import axios, { type AxiosResponse } from 'axios';
import type { Station, Location, ChargerType, StationStatus } from '@domain/types';

/**
 * Réponse brute de l'API Open Charge Map
 */
interface OCMResponse {
  ID: number;
  AddressInfo?: {
    Title?: string;
    AddressLine1?: string;
    AddressLine2?: string;
    Town?: string;
    StateOrProvince?: string;
    Postcode?: string;
    Country?: {
      Title?: string;
    };
    Latitude: number;
    Longitude: number;
  };
  Connections?: Array<{
    ID: number;
    ConnectionType?: {
      Title?: string;
      FormalName?: string;
    };
    PowerKW?: number;
    StatusType?: {
      ID: number;
      IsOperational?: boolean;
      Title?: string;
    };
  }>;
  UsageType?: {
    Title?: string;
  };
  UsageCost?: string;
  StatusType?: {
    ID: number;
    IsOperational?: boolean;
    Title?: string;
  };
}

/**
 * Convertit le statut OCM en statut de domaine
 */
function mapOCMStatusToStationStatus(
  statusType?: OCMResponse['StatusType'],
  connectionStatus?: {
    ID: number;
    IsOperational?: boolean;
    Title?: string;
  }
): StationStatus {
  // Priorité au statut de la connexion si disponible
  const status = connectionStatus || statusType;

  if (status?.IsOperational === true) {
    return 'Operational';
  }

  if (status?.IsOperational === false) {
    return 'Offline';
  }

  return 'Unknown';
}

/**
 * Mappe une réponse OCM vers notre type Station
 */
function mapOCMResponseToStation(ocmData: OCMResponse): Station {
  const addressInfo = ocmData.AddressInfo;
  const location: Location = {
    lat: addressInfo?.Latitude ?? 0,
    lng: addressInfo?.Longitude ?? 0,
  };

  // Construire l'adresse complète
  const addressParts = [
    addressInfo?.AddressLine1,
    addressInfo?.AddressLine2,
    addressInfo?.Town,
    addressInfo?.StateOrProvince,
    addressInfo?.Postcode,
    addressInfo?.Country?.Title,
  ].filter(Boolean) as string[];

  const address = addressParts.length > 0 ? addressParts.join(', ') : null;

  // Mapper les connecteurs
  const connectors: ChargerType[] =
    ocmData.Connections?.map((conn) => ({
      id: conn.ID,
      title: conn.ConnectionType?.Title || conn.ConnectionType?.FormalName || 'Unknown',
      kw: conn.PowerKW ?? null,
    })) ?? [];

  // Déterminer le statut
  const status = mapOCMStatusToStationStatus(
    ocmData.StatusType,
    ocmData.Connections?.[0]?.StatusType
  );

  return {
    id: ocmData.ID,
    title: addressInfo?.Title || `Station ${ocmData.ID}`,
    address,
    location,
    connectors,
    status,
    usageCost: ocmData.UsageCost ?? null,
  };
}

/**
 * Récupère les stations de recharge dans une zone géographique définie
 * @param minLat Latitude minimale de la bounding box
 * @param minLng Longitude minimale de la bounding box
 * @param maxLat Latitude maximale de la bounding box
 * @param maxLng Longitude maximale de la bounding box
 * @returns Liste des stations de recharge mappées au type Station
 */
export async function fetchStationsInBounds(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number
): Promise<Station[]> {
  const apiKey = process.env.NEXT_PUBLIC_OCM_API_KEY;

  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_OCM_API_KEY is not configured');
  }

  try {
    const response: AxiosResponse<OCMResponse[]> = await axios.get(
      'https://api.openchargemap.io/v3/poi/',
      {
        params: {
          boundingbox: `(${minLat},${minLng}),(${maxLat},${maxLng})`,
          output: 'json',
          compact: 'true',
          verbose: 'false',
          key: apiKey,
        },
      }
    );

    // Mapper chaque réponse OCM vers notre type Station
    return response.data.map(mapOCMResponseToStation);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch stations from Open Charge Map: ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Récupère les stations de recharge les plus proches d'un point géographique
 * @param lat Latitude du point central
 * @param lng Longitude du point central
 * @param radiusKM Rayon de recherche en kilomètres (défaut: 10)
 * @returns Liste des stations de recharge mappées au type Station
 */
export async function fetchNearbyStations(
  lat: number,
  lng: number,
  radiusKM: number = 10
): Promise<Station[]> {
  const apiKey = process.env.NEXT_PUBLIC_OCM_API_KEY;

  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_OCM_API_KEY is not configured');
  }

  try {
    console.log('🔍 Yakındaki istasyonlar aranıyor:', { lat, lng, radiusKM });
    
    const response: AxiosResponse<OCMResponse[]> = await axios.get(
      'https://api.openchargemap.io/v3/poi/',
      {
        params: {
          latitude: lat,
          longitude: lng,
          distance: radiusKM,
          distanceunit: 'KM',
          maxresults: 50, // Artırıldı 20'den 50'ye
          output: 'json',
          compact: 'true',
          verbose: 'false',
          key: apiKey,
        },
      }
    );

    console.log('📡 API Yanıtı:', {
      status: response.status,
      dataLength: response.data?.length || 0,
      firstItem: response.data?.[0] || null,
    });

    if (!response.data || response.data.length === 0) {
      console.warn('⚠️ API boş sonuç döndü. Daha geniş bir alan deneniyor...');
      
      // Eğer sonuç yoksa, daha geniş bir alan dene
      const widerResponse: AxiosResponse<OCMResponse[]> = await axios.get(
        'https://api.openchargemap.io/v3/poi/',
        {
          params: {
            latitude: lat,
            longitude: lng,
            distance: radiusKM * 2, // 2 kat daha geniş
            distanceunit: 'KM',
            maxresults: 50,
            output: 'json',
            compact: 'true',
            verbose: 'false',
            key: apiKey,
          },
        }
      );

      if (!widerResponse.data || widerResponse.data.length === 0) {
        console.warn('⚠️ Genişletilmiş arama da sonuç vermedi');
        return [];
      }

      return widerResponse.data.map(mapOCMResponseToStation);
    }

    // Mapper chaque réponse OCM vers notre type Station
    const stations = response.data.map(mapOCMResponseToStation);
    console.log('✅ İstasyonlar bulundu:', stations.length);
    return stations;
  } catch (error) {
    console.error('❌ Yakındaki istasyonlar alınırken hata:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      const errorDetails = {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      };
      console.error('❌ API Hata Detayları:', errorDetails);
      
      throw new Error(
        `Yakındaki istasyonlar alınamadı: ${errorMessage}`
      );
    }
    throw error;
  }
}

