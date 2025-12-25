# Infrastructure Layer

Cette couche contient les implémentations externes : clients API, DTOs, repositories, et services tiers.

## Règles
- **Implémentations concrètes** : Réalise les interfaces définies dans le domaine/application
- **DTOs** : Objets de transfert de données pour les APIs
- **Repositories** : Implémentations concrètes d'accès aux données
- **Services externes** : Intégrations avec des APIs tierces

## Structure recommandée
```
infrastructure/
  ├── api/             # Clients API
  ├── repositories/    # Implémentations de repositories
  ├── dtos/            # Data Transfer Objects
  └── services/        # Services externes (email, storage, etc.)
```

