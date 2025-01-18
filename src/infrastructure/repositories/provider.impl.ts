import { TODO_ABI } from "@/src/core/entities/todo-abi";
import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { ethers } from "ethers";

export class ProviderRepositoryImpl implements ProviderRepository {
  private readonly CONTRACT_ABI: typeof TODO_ABI = TODO_ABI;
  private readonly CONTRACT_ADDRESS =
    "0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B";
  private contract: ethers.Contract;
  constructor() {
    const provider = this.getSigner();
    this.contract = new ethers.Contract(
      this.CONTRACT_ADDRESS,
      this.getTodoAbi(),
      provider
    );
  }
  public getSigner() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  }

  private getTodoAbi() {
    return this.CONTRACT_ABI;
  }

  getTodoContract() {
    return this.contract;
  }
}
