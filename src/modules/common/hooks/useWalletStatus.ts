import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { WalletStatus } from "@/modules/common/enums/wallet-status.enum";

export const useWalletStatus = () => {
  const status = useAppStore((state) => state.status);

  // Computed values
  const isConnected = status === WalletStatus.CONNECTED;
  const isConnecting = status === WalletStatus.CONNECTING;

  return { status, isConnected, isConnecting };
};
