# Domain Layer

Cette couche contient la logique métier pure, les entités et les types de domaine.

## Règles
- **Aucune dépendance UI** : Pas d'imports React, Next.js, ou de composants
- **TypeScript pur** : Types, interfaces, classes, et logique métier uniquement
- **Indépendant** : Ne dépend d'aucune autre couche (application, infrastructure, presentation)

## Structure recommandée
```
domain/
  ├── entities/          # Entités du domaine
  ├── value-objects/     # Objets de valeur
  ├── types/            # Types TypeScript du domaine
  └── services/         # Services de domaine (logique métier pure)
```

