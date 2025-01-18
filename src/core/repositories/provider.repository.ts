import { ethers } from "ethers";

export interface ProviderRepository {
  getSigner: () => ethers.BrowserProvider | null;

  getTodoContract: () => ethers.Contract | null;
}
