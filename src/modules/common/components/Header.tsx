"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

import ConnectWallet from "./ConnectWallet";
import { useAppStore } from "../providers/StoreProvider";

export function Header() {
  const { availApi, subscribeFinalizedBlocks } = useAppStore(
    useShallow((state) => ({
      availApi: state.availApi,
      subscribeFinalizedBlocks: state.subscribeFinalizedBlocks,
    }))
  );

  useEffect(() => {
    subscribeFinalizedBlocks();
  }, [subscribeFinalizedBlocks, availApi]);

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          <h1>AvailX</h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/action"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Action History
          </Link>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
