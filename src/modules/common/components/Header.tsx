"use client";

import Link from "next/link";

import ConnectWallet from "./ConnectWallet";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          <h1>AvailX</h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/action-history"
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
