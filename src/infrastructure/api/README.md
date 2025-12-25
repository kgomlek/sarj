# API Clients

Clients HTTP pour communiquer avec les APIs externes.

## Clients disponibles

### `ocmClient.ts` - Open Charge Map API
Service pour récupérer les stations de recharge EV.

**Fonction principale:**
- `fetchStationsInBounds(minLat, minLng, maxLat, maxLng)` - Récupère les stations dans une bounding box

**Exemple d'utilisation:**
```typescript
import { fetchStationsInBounds } from '@infrastructure/api/ocmClient';

const stations = await fetchStationsInBounds(48.8566, 2.3522, 48.8606, 2.3562);
```

### `mapboxClient.ts` - Mapbox Directions API
Service pour calculer les routes de navigation.

**Fonction principale:**
- `getRoute(start, end)` - Calcule une route entre deux points

**Exemple d'utilisation:**
```typescript
import { getRoute } from '@infrastructure/api/mapboxClient';
import type { Location } from '@domain/types';

const start: Location = { lat: 48.8566, lng: 2.3522 };
const end: Location = { lat: 48.8606, lng: 2.3562 };
const route = await getRoute(start, end);
```

## Variables d'environnement requises

- `NEXT_PUBLIC_OCM_API_KEY` - Clé API Open Charge Map
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Token d'accès Mapbox

Voir `ENV_SETUP.md` pour plus de détails.

