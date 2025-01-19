import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { ethers, InterfaceAbi, Eip1193Provider } from "ethers";

export class ProviderRepositoryImpl implements ProviderRepository {
  private readonly _contractAbi: InterfaceAbi | null;
  private readonly _contractAddress: string | null;
  private contract?: ethers.Contract;
  private readonly _eip6963Provider: Eip1193Provider | null;
  private _ethersProvider: ethers.BrowserProvider | null = null;

  constructor({
    contractAbi,
    contractAddress,
    injectedProvider,
  }: {
    contractAbi: InterfaceAbi;
    contractAddress: string;
    injectedProvider: Eip1193Provider;
  }) {
    this._eip6963Provider = injectedProvider;
    this._contractAbi = contractAbi;
    this._contractAddress = contractAddress;
  }

  private async initializeContract() {
    try {
      if (
        !this._eip6963Provider ||
        !this._contractAddress ||
        !this._contractAbi
      ) {
        return;
      }

      const provider = await this.getProvider();
      if (!provider) return;

      // Get the current network
      const network = await provider.getNetwork();

      // Check if we're on Sepolia (chainId 11155111)
      if (network.chainId !== BigInt("11155111")) {
        console.log(
          "Contract is deployed on Sepolia. Please switch networks to interact with it.",
          network.chainId,
          BigInt("11155111")
        );
        return;
      }

      const signer = await this.getSigner();

      if (!signer) {
        console.error("Failed to get signer");
        return;
      }
      this.contract = new ethers.Contract(
        this._contractAddress,
        this._contractAbi,
        signer
      );
    } catch (error) {
      console.error("Failed to initialize contract:", error);
    }
  }

  private async initializeProvider() {
    if (!this._eip6963Provider) return null;

    const provider = new ethers.BrowserProvider(this._eip6963Provider);

    this._ethersProvider = provider;
  }

  public async getProvider() {
    if (!this._ethersProvider) {
      await this.initializeProvider();
    }
    return this._ethersProvider || null;
  }

  public async getSigner() {
    const provider = await this.getProvider();

    if (!provider) {
      return null;
    }

    return provider.getSigner();
  }
  public async getTodoContract() {
    if (!this.contract) {
      await this.initializeContract();
    }
    return this.contract || null;
  }
}
