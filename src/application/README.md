# Application Layer

Cette couche contient les cas d'usage, les hooks de gestion d'état, et la logique applicative.

## Règles
- **Orchestration** : Coordonne les interactions entre le domaine et l'infrastructure
- **Hooks React** : Peut contenir des hooks personnalisés pour la gestion d'état
- **Cas d'usage** : Implémente les scénarios métier spécifiques

## Structure recommandée
```
application/
  ├── use-cases/        # Cas d'usage (use cases)
  ├── hooks/           # Hooks React personnalisés
  ├── stores/          # Gestion d'état (Zustand, Jotai, etc.)
  └── services/        # Services applicatifs
```

