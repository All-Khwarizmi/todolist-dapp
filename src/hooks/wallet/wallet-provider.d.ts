// Type alias for a record where the keys are wallet identifiers and the values are account
// addresses or null.
type SelectedAccountByWallet = Record<string, string | null>;

// Context interface for the EIP-6963 provider.
interface WalletProviderContext {
  wallets: Record<string, EIP6963ProviderDetail>; // A list of wallets.
  selectedWallet: EIP6963ProviderDetail | null; // The selected wallet.
  selectedAccount: string | null; // The selected account address.
  errorMessage: string | null; // An error message.
  ethersProvider: BrowserProvider | null;
  todoRepository?: TodoRepository;
  connectWallet: (walletUuid: string) => Promise<void>;
  disconnectWallet: () => void;
  clearError: () => void;
}

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}
