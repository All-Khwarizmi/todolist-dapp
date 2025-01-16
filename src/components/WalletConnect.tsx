"use client";

import React from "react";
import { useSyncProviders } from "../store/useSyncProvider";

function WalletConnect() {
  const providers = useSyncProviders();
  const [open, setOpen] = React.useState(false);

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
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Connect Wallet
        <div
          className={`${
            open ? "" : "hidden"
          } absolute z-10 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm`}
        ></div>
      </button>
      {open && (
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold">Connect Wallet</h2>
            <ul className="flex flex-col gap-4">
              {providers.map((provider) => (
                <li key={provider.info.uuid}>
                  <button onClick={() => handleConnect(provider)}>
                    <img src={provider.info.icon} alt={provider.info.name} />
                    <div>{provider.info.name}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
