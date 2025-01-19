import { BrowserProvider, Contract, ethers } from "ethers";
import {
  PropsWithChildren,
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TodoRepository } from "../core/repositories/todo.repository";
import { ProviderRepositoryImpl } from "../infrastructure/repositories/provider.impl";
import { TODO_ABI } from "../core/entities/todo-abi";
import { TodoRepositoryImpl } from "../infrastructure/repositories/todos/todo.impl";

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
  getContract: (address: string, abi: any) => Promise<Contract | null>;
}

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}

export const WalletProviderContext =
  createContext<WalletProviderContext | null>(null);

// The WalletProvider component wraps all other components in the dapp, providing them with the
// necessary data and functions related to wallets.
export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [wallets, setWallets] = useState<Record<string, EIP6963ProviderDetail>>(
    {}
  );
  const [selectedWalletRdns, setSelectedWalletRdns] = useState<string | null>(
    null
  );
  const [selectedAccountByWalletRdns, setSelectedAccountByWalletRdns] =
    useState<SelectedAccountByWallet>({});
  const [todoRepository, setTodoRepository] = useState<TodoRepository>();

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const setError = (error: string) => setErrorMessage(error);
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider | null>(
    null
  );
  useEffect(() => {
    if (!selectedWalletRdns) return;
    const wallet = wallets[selectedWalletRdns];
    const providerRepository = new ProviderRepositoryImpl({
      contractAbi: TODO_ABI,
      contractAddress: "0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B",
      eipProvider: wallet.provider,
    });
    const todoRepository = new TodoRepositoryImpl(providerRepository);

    setTodoRepository(todoRepository);
  }, [selectedWalletRdns, wallets]);

  // Initialize ethers provider when wallet is selected
  useEffect(() => {
    if (selectedWalletRdns && wallets[selectedWalletRdns]) {
      const provider = new ethers.BrowserProvider(
        wallets[selectedWalletRdns].provider
      );
      setEthersProvider(provider);
    } else {
      setEthersProvider(null);
    }
  }, [selectedWalletRdns, wallets]);

  // Get contract instance
  const getContract = async (
    contractAddress: string,
    abi: any
  ): Promise<Contract | null> => {
    try {
      if (!ethersProvider) {
        throw new Error("No provider available");
      }

      const signer = await ethersProvider.getSigner();
      return new ethers.Contract(contractAddress, abi, signer);
    } catch (error: any) {
      console.error("Failed to get contract:", error);
      setError(`Failed to get contract: ${error?.message}`);
      return null;
    }
  };

  useEffect(() => {
    const savedSelectedWalletRdns = localStorage.getItem("selectedWalletRdns");
    const savedSelectedAccountByWalletRdns = localStorage.getItem(
      "selectedAccountByWalletRdns"
    );

    if (savedSelectedAccountByWalletRdns) {
      setSelectedAccountByWalletRdns(
        JSON.parse(savedSelectedAccountByWalletRdns)
      );
    }

    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      setWallets((currentWallets) => ({
        ...currentWallets,
        [event.detail.info.rdns]: event.detail,
      }));

      if (
        savedSelectedWalletRdns &&
        event.detail.info.rdns === savedSelectedWalletRdns
      ) {
        setSelectedWalletRdns(savedSelectedWalletRdns);
      }
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  }, []);

  const connectWallet = useCallback(
    async (walletRdns: string) => {
      try {
        const wallet = wallets[walletRdns];
        const accounts = (await wallet.provider.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (accounts?.[0]) {
          setSelectedWalletRdns(wallet.info.rdns);
          setSelectedAccountByWalletRdns((currentAccounts) => ({
            ...currentAccounts,
            [wallet.info.rdns]: accounts[0],
          }));

          localStorage.setItem("selectedWalletRdns", wallet.info.rdns);
          localStorage.setItem(
            "selectedAccountByWalletRdns",
            JSON.stringify({
              ...selectedAccountByWalletRdns,
              [wallet.info.rdns]: accounts[0],
            })
          );
        }
      } catch (error) {
        console.error("Failed to connect to provider:", error);
        const walletError: WalletError = error as WalletError;
        setError(
          `Code: ${walletError.code} \nError Message: ${walletError.message}`
        );
      }
    },
    [wallets, selectedAccountByWalletRdns]
  );
  const disconnectWallet = useCallback(async () => {
    if (selectedWalletRdns) {
      setSelectedAccountByWalletRdns((currentAccounts) => ({
        ...currentAccounts,
        [selectedWalletRdns]: null,
      }));

      const wallet = wallets[selectedWalletRdns];
      setSelectedWalletRdns(null);
      localStorage.removeItem("selectedWalletRdns");

      try {
        await wallet.provider.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.error("Failed to revoke permissions:", error);
      }
    }
  }, [selectedWalletRdns, wallets]);

  const contextValue: WalletProviderContext = {
    wallets,
    selectedWallet:
      selectedWalletRdns === null ? null : wallets[selectedWalletRdns],
    selectedAccount:
      selectedWalletRdns === null
        ? null
        : selectedAccountByWalletRdns[selectedWalletRdns],
    errorMessage,
    ethersProvider,
    todoRepository,
    getContract,
    connectWallet,
    disconnectWallet,
    clearError,
  };

  return (
    <WalletProviderContext.Provider value={contextValue}>
      {children}
    </WalletProviderContext.Provider>
  );
};
