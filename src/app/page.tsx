'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Charger MapboxMap dynamiquement sans SSR
const MapboxMap = dynamic(
  () => import('@presentation/components/map/MapboxMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-lg text-gray-700">Harita yükleniyor...</p>
        </div>
      </div>
    )
  }
);

const MobileSheet = dynamic(
  () => import('@presentation/components/layout/MobileSheet'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Suspense fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-700">Yükleniyor...</p>
        </div>
      }>
        {/* Carte Mapbox en plein écran */}
        <MapboxMap className="h-full w-full" />
        
        {/* Bottom Sheet pour afficher les informations de route */}
        <MobileSheet />
      </Suspense>
    </div>
  );
}
