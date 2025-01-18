"use client";

import React, { useState } from "react";
import { useWalletProvider } from "../hooks/useWalletContext";
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
      {ctx.selectedWallet ? (
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            window.confirm(ctx.selectedAccount || "") && ctx.disconnectWallet();
          }}
        >
          {formatAddress(ctx.selectedAccount || "")}
        </div>
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
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-8 w-full max-w-lg">
            {Object.keys(ctx.wallets).length > 0 ? (
              <ul className="flex flex-col gap-4 size-8">
                {Object.values(ctx.wallets).map((provider: any) => (
                  <button
                    key={provider.info.uuid}
                    onClick={() => ctx.connectWallet("Confirm to disconnect?")}
                  >
                    <img
                      width={50}
                      src={provider.info.icon}
                      alt={provider.info.name}
                    />
                    <div>{provider.info.name}</div>
                  </button>
                ))}
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
