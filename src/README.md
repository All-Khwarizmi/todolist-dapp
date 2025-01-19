
# /src/README.md

## Project Structure Overview

```
src/
├── core/               # Business domain layer
│   ├── entities/       # Domain models & interfaces
│   │   ├── todos/     # Todo related entities
│   │   └── users/     # User related entities
│   ├── repositories/  # Repository interfaces
│   └── use-cases/     # Application business logic
│       ├── todos/     # Todo operations
│       └── users/     # User operations
├── infrastructure/    # External implementations
│   └── repositories/  # Repository implementations
├── hooks/            # Custom React hooks
│   └── wallet/       # Wallet connection logic
├── components/       # React components
│   ├── todos/       # Todo related components
│   └── users/       # User related components
└── utils/           # Shared utilities
```

### Core Concepts

#### Wallet Integration

- EIP-6963 compliant wallet detection
- MetaMask and other injected wallet support
- Network and account state management

#### Smart Contract Interaction

- Ethers.js for blockchain communication
- Repository pattern for contract operations
- Transaction error handling

#### State Management

- React Query for async state
- Wallet state management
- Loading and error states

### Components Structure

#### Wallet Components

- `WalletConnect`: Main wallet connection component
- `UserBalance`: Display user's ETH balance
- `WalletProvider`: Global wallet context provider

#### Todo Components

- `TodoList`: Main todo list component
- `CreateTodo`: Todo creation form
- `Todo`: Individual todo item component

### Best Practices

- Clean Architecture principles
- Repository pattern for data access
- Use case driven development
- Type-safe development with TypeScript
- Proper error handling for blockchain operations

### Smart Contract Integration

Our DApp interacts with a TodoList contract on Sepolia:
- Contract Address: `0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B`
- Required Network: Sepolia Testnet
- Fee: 0.01 ETH per todo creation

### Useful Links

- [Ethers Documentation](https://docs.ethers.org/)
- [EIP-6963 Specification](https://eips.ethereum.org/EIPS/eip-6963)
- [React Query Documentation](https://tanstack.com/query/latest)
