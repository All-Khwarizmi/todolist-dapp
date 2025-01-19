import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { UserRepository } from "@/src/core/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
  private readonly _providerRepository: ProviderRepository;
  constructor(providerRepository: ProviderRepository) {
    this._providerRepository = providerRepository;
  }
  async getUserBalance(accountAddress: string) {
    try {
      const provider = await this._providerRepository.getProvider();

      if (!provider) {
        console.error("Failed to get provider");
        return null;
      }

      const balance = await provider.getBalance(accountAddress);

      return balance;
    } catch (error) {
      console.info(error);
      return null;
    }
  }
}
