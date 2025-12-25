# Architecture DDD (Domain-Driven Design)

Ce projet suit une architecture Domain-Driven Design (DDD) stricte pour garantir la séparation des responsabilités.

## Structure des Couches

### 📦 `src/domain`
**Logique métier pure** - Aucune dépendance externe
- Entités du domaine
- Objets de valeur (Value Objects)
- Types et interfaces TypeScript
- Services de domaine (logique métier pure)

**Règles :**
- ❌ Pas d'imports React, Next.js, ou UI
- ✅ TypeScript pur uniquement
- ✅ Indépendant des autres couches

### 🔄 `src/application`
**Orchestration et cas d'usage** - Coordonne le domaine et l'infrastructure
- Use cases (cas d'usage)
- Hooks React personnalisés
- Gestion d'état (stores)
- Services applicatifs

**Règles :**
- ✅ Peut utiliser React hooks
- ✅ Orchestre les interactions
- ✅ Dépend du domaine et de l'infrastructure

### 🔌 `src/infrastructure`
**Implémentations externes** - Connexions avec le monde extérieur
- Clients API
- Repositories (implémentations concrètes)
- DTOs (Data Transfer Objects)
- Services externes (email, storage, etc.)

**Règles :**
- ✅ Implémente les interfaces du domaine
- ✅ Gère les communications externes
- ✅ Dépend du domaine uniquement

### 🎨 `src/presentation`
**Interface utilisateur** - Couche de présentation
- Pages Next.js (`app/`)
- Composants React (`components/`)
- Composants shadcn/ui (`components/ui/`)
- Hooks de présentation
- Utilitaires UI (`lib/`)

**Règles :**
- ✅ Composants React/Next.js uniquement
- ✅ Dépend de toutes les autres couches
- ✅ Aucune logique métier

## Alias TypeScript

Les alias suivants sont configurés dans `tsconfig.json` :

```typescript
import { User } from '@domain/entities/user';
import { GetUserUseCase } from '@application/use-cases/get-user';
import { UserApiClient } from '@infrastructure/api/user-api-client';
import { Button } from '@presentation/components/ui/button';
```

## Flux de Données

```
Presentation → Application → Domain
                ↓
         Infrastructure
```

1. **Presentation** appelle les **use cases** de l'**Application**
2. **Application** utilise le **Domain** et l'**Infrastructure**
3. **Infrastructure** implémente les interfaces du **Domain**
4. **Domain** reste pur et indépendant

## Commandes

```bash
# Développement
npm run dev

# Build
npm run build

# Production
npm start

# Linter
npm run lint
```

## Ajout de Composants shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

Les composants seront automatiquement ajoutés dans `src/presentation/components/ui/`.

