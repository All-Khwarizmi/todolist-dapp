import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TodoRepository } from "../../core/repositories/todo.repository";
import { ProviderRepositoryImpl } from "../../infrastructure/repositories/provider.impl";
import { TODO_ABI } from "../../core/entities/todos/todo-abi";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todos/todo.impl";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/users.impl";
import { UserRepository } from "@/src/core/repositories/user.repository";
import { chainIDtoName } from "@/src/utils";

// Type alias for a record where the keys are wallet identifiers and the values are account
// addresses or null.
type SelectedAccountByWallet = Record<string, string | null>;

// Context interface for the EIP-6963 provider.
interface WalletProviderContext {
  wallets: Record<string, EIP6963ProviderDetail>; // A list of wallets.
  selectedWallet: EIP6963ProviderDetail | null; // The selected wallet.
  provider: EIP1193Provider | null; // The selected account address.
  selectedAccount: string | null; // The selected account address.
  errorMessage: string | null; // An error message.
  todoRepository?: TodoRepository;
  userRepository?: UserRepository;
  chainId: string | null;
  connectWallet: (walletUuid: string) => Promise<void>;
  disconnectWallet: () => void;
  clearError: () => void;
}

const CONTRACT_ADDRESS = "0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B";

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

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const setError = (error: string) => setErrorMessage(error);

  const [provider, setProvider] = useState<EIP1193Provider | null>(null);

  // Repositories
  const [userRepository, setUserRepository] = useState<UserRepository>();
  const [todoRepository, setTodoRepository] = useState<TodoRepository>();

  const [chainId, setChainId] = useState<string | null>(null);

  // Initialize ethers provider and repositories when wallet is selected
  const initRepos = useCallback(() => {
    if (!selectedWalletRdns) return;

    const wallet = wallets[selectedWalletRdns];

    const providerRepository = new ProviderRepositoryImpl({
      contractAbi: TODO_ABI,
      contractAddress: CONTRACT_ADDRESS,
      injectedProvider: wallet.provider,
    });

    const userRepository = new UserRepositoryImpl(providerRepository);

    const todoRepository = new TodoRepositoryImpl(providerRepository);

    setUserRepository(userRepository);
    setTodoRepository(todoRepository);
  }, [selectedWalletRdns, wallets, setUserRepository, setTodoRepository]);

  // Handle chain changes
  useEffect(() => {
    if (selectedWalletRdns && wallets[selectedWalletRdns]) {
      const provider = wallets[selectedWalletRdns].provider;

      // Get initial chain
      provider
        .request({ method: "eth_chainId" })
        .then(async (chainId: unknown) => {
          await handleChainChanged(chainId as string);
        })
        .catch(console.error);

      const handleChainChanged = async (chainId: string) => {
        const chainIdName = await chainIDtoName(chainId).catch(console.error);
        if (chainIdName !== chainId) {
          setChainId(chainIdName || "");
          initRepos();

          return;
        }
      };

      provider.on("chainChanged", handleChainChanged);

      return () => {
        window.removeEventListener("chainChanged", () => {});
        provider.removeListener("chainChanged", handleChainChanged);
      };
    } else {
      setChainId(null);
    }
  }, [selectedWalletRdns, wallets, initRepos]);

  // Initialize ethers provider and repositories when wallet is selected
  // Check which event should trigger the update?
  useEffect(() => {
    initRepos();
  }, [
    selectedWalletRdns,
    wallets,
    selectedAccountByWalletRdns,
    chainId,
    initRepos,
  ]);

  // Handle loading wallets and accounts from local storage and setting event listeners for changes
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

      setProvider(event.detail.provider);

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
    chainId,
    provider,
    errorMessage,
    userRepository,
    todoRepository,
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
