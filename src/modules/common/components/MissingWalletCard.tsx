import { Wallet } from "lucide-react";
import ConnectWallet from "./ConnectWallet";

interface MissingWalletCardProps {
  title?: string;
  description?: string;
}

export const MissingWalletCard = ({
  title = "Connect Your Wallet",
  description = "Connect your wallet to view your action history on the Avail network.",
}: MissingWalletCardProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
        <Wallet className="w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-6">{description}</p>
      <ConnectWallet />
    </div>
  );
};
