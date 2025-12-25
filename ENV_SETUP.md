# Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Open Charge Map API Key
# Obtenez votre clé API sur: https://openchargemap.org/site/develop/api
NEXT_PUBLIC_OCM_API_KEY=your_open_charge_map_api_key_here

# Mapbox Access Token
# Obtenez votre token sur: https://account.mapbox.com/access-tokens/
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
```

## Instructions

1. Copiez le contenu ci-dessus dans un nouveau fichier `.env.local` à la racine du projet
2. Remplacez `your_open_charge_map_api_key_here` par votre clé API Open Charge Map
3. Remplacez `your_mapbox_access_token_here` par votre token Mapbox
4. Le fichier `.env.local` est déjà dans `.gitignore` et ne sera pas commité

## Où obtenir les clés API

- **Open Charge Map**: https://openchargemap.org/site/develop/api
- **Mapbox**: https://account.mapbox.com/access-tokens/

