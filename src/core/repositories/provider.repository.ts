import { Eip1193Provider, ethers } from "ethers";

export interface ProviderRepository {
  getProvider: () => Promise<ethers.BrowserProvider | null>;

  getTodoContract: () => Promise<ethers.Contract | null>;
}
