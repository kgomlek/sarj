'use client';

/**
 * Bottom Sheet mobile pour afficher les informations de route
 * Utilise vaul pour une expérience mobile optimale
 */

import { Drawer } from 'vaul';
import { useAppStore } from '@application/store/useAppStore';
import { Loader2, MapPin, Navigation, Clock, Zap, X, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import StationList from '@presentation/components/ui/StationList';

// Fonction pour traduire le statut
const translateStatus = (status: string): string => {
  switch (status) {
    case 'Operational':
      return 'Çalışıyor';
    case 'Offline':
      return 'Çevrimdışı';
    case 'Unknown':
      return 'Bilinmiyor';
    default:
      return status;
  }
};

export default function MobileSheet() {
  const { 
    route, 
    isLoading, 
    destination, 
    selectedStation, 
    nearbyStations,
    viewMode,
    userLocation,
    setSelectedStation 
  } = useAppStore();

  // Mesafeyi formatla (metre/kilometre)
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  };

  // Süreyi formatla (dakika/saat)
  const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} dk`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} sa`;
    }
    return `${hours} sa ${remainingMinutes} dk`;
  };

  return (
    <Drawer.Root open={true} modal={false} dismissible={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[96vh] flex-col rounded-t-[10px] bg-white">
          <Drawer.Title className="sr-only">Bilgi Paneli</Drawer.Title>
          <div className="mx-auto mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
          <div className="flex-1 overflow-y-auto p-4">
            {viewMode === 'STATION_DETAIL' && selectedStation ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedStation.title}
                  </h2>
                  <button
                    onClick={() => setSelectedStation(null)}
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label="İstasyon detaylarını kapat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Durum */}
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  {selectedStation.status === 'Operational' ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : selectedStation.status === 'Offline' ? (
                    <XCircle className="h-6 w-6 text-red-600" />
                  ) : (
                    <HelpCircle className="h-6 w-6 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Durum</p>
                    <p className={`text-lg font-semibold ${
                      selectedStation.status === 'Operational' ? 'text-green-600' :
                      selectedStation.status === 'Offline' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {translateStatus(selectedStation.status)}
                    </p>
                  </div>
                </div>

                {/* Adres */}
                {selectedStation.address && (
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Adres</p>
                      <p className="text-base text-gray-900">{selectedStation.address}</p>
                    </div>
                  </div>
                )}

                {/* Bağlayıcılar */}
                {selectedStation.connectors.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Bağlayıcılar</h3>
                    <div className="space-y-2">
                      {selectedStation.connectors.map((connector) => (
                        <div
                          key={connector.id}
                          className="flex items-center gap-3 rounded-lg bg-gray-50 p-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <Zap className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{connector.title}</p>
                            {connector.kw && (
                              <p className="text-sm text-gray-500">
                                {connector.kw} kW
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Kullanım Ücreti */}
                {selectedStation.usageCost && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                      <span className="text-lg font-bold text-yellow-600">₺</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Kullanım Ücreti</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedStation.usageCost}
                      </p>
                    </div>
                  </div>
                )}

                {/* Geri Dön Butonu */}
                <button
                  onClick={() => setSelectedStation(null)}
                  className="w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  {route ? 'Rota Bilgilerine Dön' : 'Listeye Dön'}
                </button>
              </div>
            ) : viewMode === 'ROUTING' ? (
              isLoading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <p className="text-lg font-medium text-gray-700">
                    Rota hesaplanıyor...
                  </p>
                  <p className="text-sm text-gray-500">
                    Lütfen en iyi rotayı bulmamızı bekleyin
                  </p>
                </div>
              ) : route ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                      Rota Bilgileri
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Mesafe */}
                    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <Navigation className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Mesafe</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatDistance(route.distance)}
                        </p>
                      </div>
                    </div>

                    {/* Süre */}
                    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Süre</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatDuration(route.duration)}
                        </p>
                      </div>
                    </div>

                    {/* Hedef Bilgisi */}
                    {destination && (
                      <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                          <MapPin className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-500">
                            Hedef
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {destination.lat.toFixed(6)}, {destination.lng.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <MapPin className="h-12 w-12 text-gray-400" />
                  <p className="text-center text-lg font-medium text-gray-700">
                    Hedef seçmek için haritaya dokunun
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    Rotayı hesaplamak için haritada herhangi bir yere tıklayın
                  </p>
                </div>
              )
            ) : viewMode === 'IDLE' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Yakındaki Şarj İstasyonları
                  </h2>
                  {userLocation && (
                    <span className="text-sm text-gray-500">
                      {nearbyStations.length} istasyon
                    </span>
                  )}
                </div>
                {!userLocation ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <MapPin className="h-12 w-12 text-gray-400" />
                    <p className="text-center text-gray-500">
                      Konumunuz bulunuyor...
                    </p>
                  </div>
                ) : (
                  <StationList
                    stations={nearbyStations}
                    onSelect={setSelectedStation}
                    userLocation={userLocation}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <MapPin className="h-12 w-12 text-gray-400" />
                <p className="text-center text-lg font-medium text-gray-700">
                  Konum bekleniyor...
                </p>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
