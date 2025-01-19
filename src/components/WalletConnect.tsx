"use client";

import React, { useState } from "react";
import { useWalletProvider } from "../hooks/wallet/use-wallet-context";
import { formatAddress } from "../utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

function WalletConnect() {
  const [open, setOpen] = useState(false);
  const ctx = useWalletProvider();

  if (!ctx) {
    return <div>WalletProvider not found</div>;
  }

  return (
    <div>
      {ctx.errorMessage && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{ctx.errorMessage}</AlertDescription>
        </Alert>
      )}
      {ctx.selectedAccount ? (
        <Button
          variant="outline"
          onClick={() => {
            const isOk = window.confirm("Disconnect wallet");
            if (isOk) {
              ctx.disconnectWallet();
            }
          }}
        >
          {formatAddress(ctx.selectedAccount)}
        </Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Connect Wallet</Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
          </DialogHeader>
          {Object.keys(ctx.wallets).length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.values(ctx.wallets).map(
                (provider: EIP6963ProviderDetail) => (
                  <Button
                    key={provider.info.uuid}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24"
                    onClick={async () => {
                      await ctx.connectWallet(provider.info.rdns);
                      setOpen(false);
                    }}
                  >
                    <img
                      width={32}
                      height={32}
                      src={provider.info.icon || "/placeholder.svg"}
                      alt={provider.info.name}
                      className="mb-2"
                    />
                    <span className="text-sm">{provider.info.name}</span>
                  </Button>
                )
              )}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No wallet providers available
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WalletConnect;
