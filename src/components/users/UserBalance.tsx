"use client";

import React, { useEffect } from "react";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { useGetUserBalance } from "@/src/core/usecases/users/get-balance";
function UserBalance() {
  const ctx = useWalletProvider();

  const {
    data: userBalance,
    isLoading,
    error,
    refetch,
  } = useGetUserBalance({
    userRepository: ctx?.userRepository,
    accountAddress: ctx?.selectedAccount || "",
  });

  useEffect(() => {
    refetch();
  }, [ctx?.chainId, ctx?.selectedAccount]);

  if (!ctx?.selectedAccount) return null;

  return (
    <div className="flex  gap-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {ctx.chainId && (
        <p className="bg-violet-300 text-background rounded-lg p-1 px-2">
          {" "}
          Network: {ctx.chainId}
        </p>
      )}
      {userBalance && (
        <p className="bg-green-300 text-background rounded-lg p-1 px-2">
          {" "}
          Balance: {userBalance}
        </p>
      )}
    </div>
  );
}

export default UserBalance;
