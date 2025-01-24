"use client";

import { Loader2, WalletIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../providers/StoreProvider";
import { WalletStatus } from "../enums/wallet-status.enum";
import { Button } from "@/modules/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/components/ui/dropdown-menu";

const ConnectWallet = () => {
  const { status, account, connect, disconnect } = useAppStore(
    useShallow((state) => ({
      status: state.status,
      account: state.account,
      connect: state.connect,
      disconnect: state.disconnect,
    }))
  );

  if (status === WalletStatus.CONNECTING) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (status === WalletStatus.DISCONNECTED || !account) {
    return (
      <Button onClick={connect}>
        <WalletIcon className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <WalletIcon className="mr-2 h-4 w-4 text-primary" />
          <span className="text-primary font-medium">
            {account.address.slice(0, 6)}...{account.address.slice(-6)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-primary font-medium">
          {account.meta.name || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(account.address);
          }}
        >
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem>View on Explorer</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="text-destructive">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectWallet;
