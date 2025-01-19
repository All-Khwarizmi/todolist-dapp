import { Eip1193Provider, ethers } from "ethers";

export interface ProviderRepository {
  getSigner: (eip: Eip1193Provider) => ethers.BrowserProvider | null;

  getTodoContract: () => ethers.Contract | null;
}
