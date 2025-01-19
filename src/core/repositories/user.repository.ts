export interface UserRepository {
  getUserBalance: (accountAddress: string) => Promise<BigInt | null>;
}
