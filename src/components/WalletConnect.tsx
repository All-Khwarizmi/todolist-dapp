"use client";

import React from "react";
import { useSyncProviders } from "../store/useSyncProvider";

function WalletConnect() {
  const providers = useSyncProviders();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      console.log(accounts);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      {providers.length ? (
        providers.map((provider) => (
          <button
            key={provider.info.uuid}
            onClick={() => handleConnect(provider)}
          >
            {provider.info.name}
          </button>
        ))
      ) : (
        <button
          onClick={() =>
            window.dispatchEvent(new Event("eip6963:requestProvider"))
          }
        ></button>
      )}
    </div>
  );
}

export default WalletConnect;
