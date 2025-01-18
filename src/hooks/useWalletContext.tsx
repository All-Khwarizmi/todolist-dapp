import { useContext } from "react";
import { WalletProviderContext } from "./WalletProvider";

export const useWalletProvider = () => {
  if (!WalletProviderContext) {
    throw new Error("useWalletProvider must be used within a WalletProvider");
  }
  useContext(WalletProviderContext);
};
