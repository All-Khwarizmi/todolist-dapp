"use client";

import React, { useEffect } from "react";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { useGetUserBalance } from "@/src/core/usecases/users/get-balance";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="flex items-center space-x-2">
      {ctx.chainId && <Badge variant="secondary">Network: {ctx.chainId}</Badge>}
      {isLoading ? (
        <Skeleton className="h-5 w-[100px]" />
      ) : error ? (
        <Badge variant="destructive">Error: {error.message}</Badge>
      ) : userBalance ? (
        <Badge variant="default">Balance: {userBalance}</Badge>
      ) : null}
    </div>
  );
}

export default UserBalance;
