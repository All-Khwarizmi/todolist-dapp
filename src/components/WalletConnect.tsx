"use client";

import React, { useState } from "react";
import { useWalletProvider } from "../hooks/wallet/use-wallet-context";
import { formatAddress } from "../utils";

function WalletConnect() {
  const [open, setOpen] = useState(false);
  const ctx = useWalletProvider();

  if (!ctx) {
    return <div>WalletProvider not found</div>;
  }

  return (
    <div>
      {ctx.errorMessage && (
        <div onClick={ctx.clearError} className="text-red-500 text-sm">
          {ctx.errorMessage}
        </div>
      )}
      {ctx.selectedAccount ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg"
          onClick={() => {
            window.confirm("Disconnect wallet") && ctx.disconnectWallet();
          }}
        >
          {formatAddress(ctx.selectedAccount || "")}
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      )}
      {open && (
        <div className="absolute z-10 top-0 inset-0 w-full h-full  backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-8 w-full max-w-lg">
            {Object.keys(ctx.wallets).length > 0 ? (
              <ul className="flex flex-col gap-4 size-8">
                {Object.values(ctx.wallets).map(
                  (provider: EIP6963ProviderDetail) => (
                    <button
                      key={provider.info.uuid}
                      onClick={async () => {
                        console.log(provider.info);
                        await ctx.connectWallet(provider.info.rdns);
                        setOpen(false);
                      }}
                    >
                      <img
                        width={50}
                        src={provider.info.icon}
                        alt={provider.info.name}
                      />
                      <div>{provider.info.name}</div>
                    </button>
                  )
                )}
              </ul>
            ) : (
              <div>there are no Announced Providers</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
