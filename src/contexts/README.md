# Context Layer

This layer manages state and provider implementations for our Web3 application, featuring both local and global state management for EIP-6963 wallet interactions.

## 📁 Structure

```
contexts/
├── store.ts                # Local state implementation
├── useSyncProvider.ts      # Local state hook
├── query-provider.tsx      # Global state provider
└── query-keys.tsx         # React Query keys
```

## 🔄 State Management

### Local State (EIP-6963)
Based on [MetaMask's local state tutorial](https://docs.metamask.io/wallet/tutorials/react-dapp-local-state/):
- External store pattern
- Provider event handling
- State synchronization

### Global State
Based on [MetaMask's global state tutorial](https://docs.metamask.io/wallet/tutorials/react-dapp-global-state/):
- React Query integration
- Centralized state management
- Cache invalidation strategies

## ⚡ Core Features

### Provider Store
```typescript
export const store = {
  value: () => providers,
  subscribe: (callback: () => void) => {
    // EIP-6963 event handling
    // Provider registration
    // State updates
  }
}
```

### Query Management
- Wallet state caching
- Transaction state handling
- Blockchain data synchronization

## 🎯 Best Practices

- Provider deduplication
- Event cleanup
- Type-safe implementation
- State synchronization
- Proper error boundaries

## 🔧 Usage

```typescript
// Local state usage
const providers = useSyncProviders();

// Global state usage
const { data, isLoading } = useQuery({
  queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
  // ... query config
});