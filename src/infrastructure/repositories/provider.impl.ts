import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { ethers, InterfaceAbi, Eip1193Provider } from "ethers";

export class ProviderRepositoryImpl implements ProviderRepository {
  private readonly _contractAbi: InterfaceAbi | null;
  private readonly _contractAddress: string | null;
  private contract?: ethers.Contract;
  private readonly _eipSigner: Eip1193Provider | null;
  private _ethersProvider: ethers.BrowserProvider | null = null;

  constructor({
    contractAbi,
    contractAddress,
    eipProvider,
  }: {
    contractAbi: InterfaceAbi;
    contractAddress: string;
    eipProvider: Eip1193Provider;
  }) {
    this._eipSigner = eipProvider;
    this._contractAbi = contractAbi;
    this._contractAddress = contractAddress;
  }

  private async initializeContract() {
    try {
      if (!this._eipSigner || !this._contractAddress || !this._contractAbi) {
        return;
      }

      const provider = await this.getProvider();
      if (!provider) return;

      // Get the current network
      const network = await provider.getNetwork();
      console.log("Current network:", network.chainId);

      // Check if we're on Sepolia (chainId 11155111)
      if (network.chainId !== BigInt("11155111")) {
        console.log(
          "Contract is deployed on Sepolia. Please switch networks to interact with it.",
          network.chainId,
          BigInt("11155111")
        );
        return;
      }

      this.contract = new ethers.Contract(
        this._contractAddress,
        this._contractAbi,
        provider
      );
    } catch (error) {
      console.error("Failed to initialize contract:", error);
    }
  }

  private async initializeProvider() {
    if (!this._eipSigner) return null;

    const provider = new ethers.BrowserProvider(this._eipSigner);

    this._ethersProvider = provider;
  }

  public async getProvider() {
    if (!this._ethersProvider) {
      await this.initializeProvider();
    }
    return this._ethersProvider || null;
  }
  public async getTodoContract() {
    if (!this.contract) {
      await this.initializeContract();
    }
    return this.contract || null;
  }
}
