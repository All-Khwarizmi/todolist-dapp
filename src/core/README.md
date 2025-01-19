# Core Layer

This layer contains the pure domain logic for our Web3 TodoList application.

## 📁 Structure

```
core/
├── entities/            
│   ├── todos/          # Todo domain models
│   │   ├── todo.ts      
│   │   ├── todo.dto.ts  
│   │   └── errors.ts   
│   └── users/          # User domain models
├── repositories/       # Repository interfaces
│   ├── provider.repository.ts
│   ├── todo.repository.ts
│   └── user.repository.ts
└── use-cases/         # Business logic
    ├── todos/         # Todo operations
    └── users/         # User operations
```

## 🏗 Domain Models

### Todo Entity
- Status management (CREATED, UPDATED)
- Creation timestamps
- Definition validation
- Blockchain-specific properties

### Repository Interfaces
- Smart contract interactions
- Provider management
- Transaction handling

## ⚙ Use Cases

### Todo Operations
- Create (with fee)
- Update status/definition
- Delete (with refund)
- List retrieval

### User Operations
- Balance checking
- Owner verification
- Network validation

## 🔒 Best Practices

- Pure domain logic only
- No external dependencies
- Clear error definitions
- Type-safe interactions
- Blockchain-specific validations

## Example Domain Model

```typescript
export enum Status {
  CREATED,
  UPDATED
}

export interface Todo {
  definition: string;
  status: Status;
  createdAt: Date;
}

export interface TodoRepository {
  createTodo(definition: string): Promise<boolean>;
  updateTodo(index: number, todo: Partial<Todo>): Promise<boolean>;
  deleteTodo(index: number): Promise<boolean>;
}
```