import MapboxMap from '@presentation/components/map/MapboxMap';
import MobileSheet from '@presentation/components/layout/MobileSheet';

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Carte Mapbox en plein écran */}
      <MapboxMap className="h-full w-full" />
      
      {/* Bottom Sheet pour afficher les informations de route */}
      <MobileSheet />
    </div>
  );
}
