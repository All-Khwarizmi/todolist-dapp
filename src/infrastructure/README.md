# Infrastructure Layer

This layer implements the technical interfaces defined in the core layer for blockchain interactions.

## 🏗 Structure

```
infrastructure/
└── repositories/
    ├── provider.impl.ts    # Ethers provider implementation
    ├── todos/
    │   └── todo.impl.ts    # Todo contract interactions
    └── users.impl.ts       # User-related blockchain operations
```

## 🔧 Implementation Details

### Provider Repository
- EIP-6963 provider management
- Ethers BrowserProvider integration
- Network validation (Sepolia)
- Contract initialization & signer management

### Todo Repository
- Smart contract method calls
- Transaction handling
- Error mapping to domain errors
- Event tracking

## Best Practices

- Map blockchain errors to domain errors
- Handle transaction states properly
- Validate network before operations
- Wait for transaction confirmations
- Use proper typing for contract interactions

## Example Implementation

```typescript
export class TodoRepositoryImpl implements TodoRepository {
  private readonly _providerRepository: ProviderRepository;

  async updateTodo(index: number, updatedTodo: Partial<Todo>) {
    try {
      const contract = await this._providerRepository.getTodoContract();
      if (!contract) throw new Error("Contract not initialized");

      const tx = await contract.updateTodo(
        index,
        updatedTodo.status,
        updatedTodo.definition
      );

      await tx.wait();
      return true;
    } catch (error) {
      // Map blockchain errors to domain errors
      throw mapBlockchainError(error);
    }
  }
}
```