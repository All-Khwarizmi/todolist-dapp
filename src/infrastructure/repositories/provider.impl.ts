import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { ethers, InterfaceAbi, Eip1193Provider } from "ethers";
// "0xC8b741ac7BA75e49aE2Bfd7E5e3446df45f4DA9B";

export class ProviderRepositoryImpl implements ProviderRepository {
  private readonly _contractAbi: InterfaceAbi | null;
  private readonly _contractAddress: string | null;
  private contract?: ethers.Contract;
  constructor({
    contractAbi,
    contractAddress,
    eipProvider,
  }: {
    contractAbi: InterfaceAbi;
    contractAddress: string;
    eipProvider: Eip1193Provider;
  }) {
    try {
      this._contractAbi = contractAbi;
      this._contractAddress = contractAddress;
      const provider = this.getSigner(eipProvider);
      if (!this._contractAddress || !this._contractAbi) return;
      this.contract = new ethers.Contract(
        this._contractAddress,
        this._contractAbi,
        provider
      );
    } catch (error) {
      this._contractAbi = null;
      this._contractAddress = null;

      console.error("Failed to initialize contract");
      console.error(error);
    }
  }
  public getSigner(eip: Eip1193Provider) {
    try {
      const provider = new ethers.BrowserProvider(eip);
      return provider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public getTodoContract() {
    if (!this.contract) return null;
    return this.contract;
  }
}
