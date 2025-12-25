# Use Cases

Les cas d'usage (use cases) orchestrent les interactions entre le domaine et l'infrastructure pour réaliser des scénarios métier spécifiques.

## Exemple de structure

```typescript
// Example: src/application/use-cases/get-user-profile.ts
import type { UserRepository } from '@infrastructure/repositories/user-repository';
import type { User } from '@domain/entities/user';

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    return await this.userRepository.findById(userId);
  }
}
```

