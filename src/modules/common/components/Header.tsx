"use client";

import ConnectWallet from "./ConnectWallet";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1>AvailX</h1>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
