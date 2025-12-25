'use client';

/**
 * Composant de carte Mapbox avec géolocalisation, marqueurs et visualisation de route
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import Map, {
  type MapRef,
  Marker,
  Source,
  Layer,
  type MapMouseEvent,
} from 'react-map-gl/mapbox';
import { useAppStore } from '@application/store/useAppStore';
import type { Location } from '@domain/types';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapboxMapProps {
  className?: string;
}

export default function MapboxMap({ className }: MapboxMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [isGeolocating, setIsGeolocating] = useState(false);

  const {
    userLocation,
    destination,
    route,
    stations,
    setUserLocation,
    setDestination,
    setSelectedStation,
  } = useAppStore();

  // Konum bulma - komponent yüklendiğinde
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Bu tarayıcı konum servisini desteklemiyor');
      return;
    }

    // Eğer konum zaten varsa, tekrar isteme
    if (userLocation) {
      return;
    }

    setIsGeolocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        // setUserLocation async olduğu için await kullan
        await setUserLocation(location);
        setIsGeolocating(false);

        // Haritayı kullanıcı konumuna odakla
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [location.lng, location.lat],
            zoom: 14,
            duration: 1500,
          });
        }
      },
      (error) => {
        console.error('Konum alınırken hata:', error);
        setIsGeolocating(false);
        
        // Hata mesajını kullanıcıya göster
        if (error.code === error.PERMISSION_DENIED) {
          console.warn('Konum izni reddedildi');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.warn('Konum bilgisi alınamadı');
        } else if (error.code === error.TIMEOUT) {
          console.warn('Konum isteği zaman aşımına uğradı');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // 15 saniye timeout
        maximumAge: 60000, // 1 dakika cache
      }
    );
  }, [setUserLocation, userLocation]);

  // Créer une FeatureCollection GeoJSON à partir des stations
  const stationsGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: stations.map((station) => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [station.location.lng, station.location.lat] as [number, number],
        },
        properties: {
          id: station.id,
          title: station.title,
          status: station.status,
        },
      })),
    };
  }, [stations]);

  // Gérer le clic sur la carte pour définir la destination ou sélectionner une station
  const handleMapClick = (e: MapMouseEvent) => {
    // Vérifier si on a cliqué sur une station
    if (e.features && e.features.length > 0) {
      const clickedFeature = e.features[0];
      // Vérifier si c'est une station (via le layer id)
      if (clickedFeature.layer?.id === 'stations-layer') {
        const stationId = clickedFeature.properties?.id;
        if (stationId !== undefined) {
          const station = stations.find((s) => String(s.id) === String(stationId));
          if (station) {
            setSelectedStation(station);
            return;
          }
        }
      }
    }

    // Sinon, définir la destination
    const location: Location = {
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    };
    setDestination(location);
    setSelectedStation(null); // Réinitialiser la sélection de station
  };

  // Ajuster la vue pour afficher la route si elle existe
  useEffect(() => {
    if (route?.bbox && mapRef.current) {
      mapRef.current.fitBounds(
        [
          [route.bbox[0], route.bbox[1]], // sud-ouest
          [route.bbox[2], route.bbox[3]], // nord-est
        ],
        {
          padding: 50,
          duration: 1000,
        }
      );
    }
  }, [route]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-red-500">Mapbox token is not configured</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: userLocation?.lng || 2.3522, // Paris par défaut
          latitude: userLocation?.lat || 48.8566,
          zoom: 13,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleMapClick}
        cursor="pointer"
        interactiveLayerIds={['stations-layer']}
      >
        {/* Marqueur de position utilisateur (point bleu) */}
        {userLocation && (
          <Marker
            longitude={userLocation.lng}
            latitude={userLocation.lat}
            anchor="center"
          >
            <div className="relative">
              <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600" />
            </div>
          </Marker>
        )}

        {/* Marqueur de destination (épingle rouge) */}
        {destination && (
          <Marker
            longitude={destination.lng}
            latitude={destination.lat}
            anchor="bottom"
          >
            <div className="relative">
              <svg
                width="30"
                height="40"
                viewBox="0 0 30 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0C6.716 0 0 6.716 0 15c0 11.25 15 25 15 25s15-13.75 15-25C30 6.716 23.284 0 15 0z"
                  fill="#EF4444"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle cx="15" cy="15" r="6" fill="#FFFFFF" />
              </svg>
            </div>
          </Marker>
        )}

        {/* Visualisation de la route */}
        {route?.geometry && (
          <Source
            id="route"
            type="geojson"
            data={route.geometry}
          >
            <Layer
              id="route-line"
              type="line"
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': '#3B82F6',
                'line-width': 4,
                'line-opacity': 0.7,
              }}
            />
          </Source>
        )}

        {/* Affichage des stations de recharge avec GeoJSON */}
        {stations.length > 0 && (
          <Source
            id="stations-source"
            type="geojson"
            data={stationsGeoJSON}
          >
            <Layer
              id="stations-layer"
              type="circle"
              paint={{
                'circle-color': '#22c55e',
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
              }}
            />
          </Source>
        )}

        {/* Konum bulma göstergesi */}
        {isGeolocating && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 py-2 shadow-lg">
            <p className="text-sm text-gray-700">Konumunuz bulunuyor...</p>
          </div>
        )}
      </Map>
    </div>
  );
}

