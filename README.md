
# Web3 TodoList DApp 📝

A modern decentralized application (DApp) that interacts with a TodoList smart contract on Sepolia testnet. Built with Next.js 14, Clean Architecture, and EIP-6963 wallet support ([github repo with example implementation](https://github.com/WalletConnect/EIP6963)).

## 🌟 Key Features

- **Smart Contract Integration**
  - Create todos (0.01 ETH fee)
  - Update todo status and content
  - Delete todos (with fee refund)
  - Real-time blockchain state updates

- **Modern Wallet Integration**
  - EIP-6963 compliant multi-wallet support
  - MetaMask and other injected wallets
  - Ethers.js for blockchain interactions
  - Real-time account & network detection

- **Clean Architecture**
  - Domain-driven design
  - Clear separation of concerns
  - Repository pattern for data access
  - Use-case driven business logic

## 🛠 Technical Stack

### Core
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Ethers.js**: Blockchain interaction library
- **EIP-6963**: Modern wallet connection standard

### State & Data
- **TanStack Query**: Data fetching and caching
- **Zustand**: State management
- **shadcn/ui**: UI component library

### Architecture
- **Clean Architecture**: Domain-driven design
- **Repository Pattern**: Data access abstraction
- **Use Case Pattern**: Business logic organization

## 🔗 Smart Contract Details

- **Network**: Sepolia Testnet
- **Address**: `0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B`
- [View on Etherscan](https://sepolia.etherscan.io/address/0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B#code)

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## 📁 Project Structure

```
src/
├── core/            # Business logic
│   ├── entities/    # Domain models
│   ├── repositories/# Data interfaces
│   └── use-cases/   # Business operations
├── infrastructure/  # External implementations
├── hooks/          # React hooks
│   └── wallet/     # Wallet connection logic
└── components/     # UI components
```

## 🧪 Testing

```bash
pnpm test
```

## 📘 Documentation

- `/src/core/README.md`: Core business logic
- `/src/infrastructure/README.md`: Implementation details
- `/src/contexts/README.md`: Global state management
- `/app/README.md`: Next.js app structure

## 🔒 Security Considerations

- Error handling for transaction failures
- Network validation
- Proper transaction state management
- User feedback for blockchain operations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT
