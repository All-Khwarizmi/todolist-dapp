import { ethers } from "ethers";

export interface ProviderRepository {
  getSigner: () => ethers.BrowserProvider;

  getTodoContract: () => ethers.Contract;

  
}
