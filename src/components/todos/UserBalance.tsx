"use client";
import { inject } from "@/src/infrastructure/di/inject";
import { QUERY_KEYS } from "@/src/store/query-keys";
import { useSyncProviders } from "@/src/store/useSyncProvider";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useEffect } from "react";
const USER_ADR = "0x7d971C39bb700AcEc20879D46f092dC0DB1dbF9E";
function UserBalance() {
  const provider = inject.providerRepository;
  const walletProvider = useSyncProviders();

  useEffect(() => {
    console.log(walletProvider);
    
  }, [walletProvider]);

  const {
    data: userBalance,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS.GET_USER_BALANCE],
    queryFn: () => provider.getUserBalance(USER_ADR),
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <p>User Balance: {formatBalance(userBalance)}</p>
    </div>
  );

  function formatBalance(balance?: BigInt) {
    return ethers.formatEther(balance?.toString() || "0").toString();
  }
}

export default UserBalance;
