# Presentation Layer

Cette couche contient l'interface utilisateur : composants React, pages Next.js, et hooks de présentation.

## Règles
- **UI uniquement** : Composants React/Next.js
- **Composants shadcn/ui** : Dans `components/ui/`
- **Pages Next.js** : Dans `app/` (App Router)
- **Hooks de présentation** : Hooks spécifiques à l'UI

## Structure
```
presentation/
  ├── app/             # Pages Next.js (App Router)
  ├── components/      # Composants React
  │   ├── ui/         # Composants shadcn/ui
  │   └── features/   # Composants spécifiques aux features
  ├── hooks/          # Hooks de présentation
  └── lib/            # Utilitaires de présentation (utils, helpers)
```

