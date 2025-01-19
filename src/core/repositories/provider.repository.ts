import { ethers } from "ethers";

export interface ProviderRepository {
  getProvider: () => Promise<ethers.BrowserProvider | null>;

  getSigner: () => Promise<ethers.Signer | null>;

  getTodoContract: () => Promise<ethers.Contract | null>;
}
