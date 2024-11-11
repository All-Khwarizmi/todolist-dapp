# Infrastructure Layer

Implémentation technique des interfaces définies dans le core.

## Structure

- `repositories/`: Implémentation des repositories
  - Utilisation de Prisma/PostgreSQL
  - Gestion des erreurs

## Bonnes Pratiques

- Isoler le code spécifique à la base de données
- Convertir les erreurs techniques en erreurs métier

```typescript
// src/core/entities/__tests__/todo.test.ts
import { describe, it, expect } from "vitest";
import { TodoSchema } from "../todo";

describe("Todo Entity", () => {
  it("should validate a correct todo", () => {
    const validTodo = {
      title: "Test todo",
      completed: false,
    };

    const result = TodoSchema.safeParse(validTodo);
    expect(result.success).toBe(true);
  });
});
```
