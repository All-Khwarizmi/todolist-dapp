import { TODO_ABI } from "@/src/core/entities/todo-abi";
import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { ethers } from "ethers";

export class ProviderRepositoryImpl implements ProviderRepository {
  private readonly CONTRACT_ABI: typeof TODO_ABI = TODO_ABI;
  private readonly CONTRACT_ADDRESS =
    "0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B";
  private contract?: ethers.Contract;
  constructor() {
    try {
      const provider = this.getSigner();
      this.contract = new ethers.Contract(
        this.CONTRACT_ADDRESS,
        this.getTodoAbi(),
        provider
      );
    } catch (error) {
      console.error(error);
    }
  }
  public getSigner() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      return provider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private getTodoAbi() {
    return this.CONTRACT_ABI;
  }

  public getTodoContract() {
    if (!this.contract) return null;
    return this.contract;
  }

  getUserBalance(accountAddress: string) {
    try {
      const signer = this.getSigner();

      if (!signer) return null;
      return signer.getBalance(accountAddress);
    } catch (error) {
      console.error(error);
    }
  }
}
