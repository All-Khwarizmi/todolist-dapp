import { UserRepository } from "../../repositories/user.repository";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/contexts/query-keys";
import { formatBalance } from "@/src/utils";

class GetUserBalance {
  private _userRepository: UserRepository;
  private _accountAddress: string;

  constructor(userRepository: UserRepository, accountAddress: string) {
    this._userRepository = userRepository;
    this._accountAddress = accountAddress;
  }

  async execute() {
    try {
      const userBalance = await this._userRepository.getUserBalance(
        this._accountAddress
      );

      const formattedUserBalance = formatBalance(userBalance?.toString() || "");

      return formattedUserBalance;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

export function useGetUserBalance({
  userRepository,
  accountAddress,
}: {
  userRepository?: UserRepository;
  accountAddress?: string;
}) {
  let getUserBalance;
  if (userRepository && accountAddress) {
    getUserBalance = new GetUserBalance(
      userRepository,
      accountAddress
    ).execute();
  } else {
    getUserBalance = null;
  }
  return useQuery({
    queryKey: [QUERY_KEYS.USERS.GET_USER_BALANCE],
    queryFn: () => getUserBalance,
  });
}
