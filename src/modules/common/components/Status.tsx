"use client";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useWalletStatus } from "@/modules/common/hooks/useWalletStatus";
import { Badge } from "@/modules/common/components/ui/badge";

const Status = () => {
  const availApi = useAppStore((state) => state.availApi);
  const { isConnected, isConnecting } = useWalletStatus();

  if (isConnecting) {
    return (
      <Badge variant="secondary" className="fixed bottom-4 right-4">
        Connecting...
      </Badge>
    );
  }

  if (!isConnected) {
    return (
      <Badge variant="destructive" className="fixed bottom-4 right-4">
        Wallet Not Connected
      </Badge>
    );
  }

  if (!availApi) {
    return (
      <Badge variant="destructive" className="fixed bottom-4 right-4">
        Network Error
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="fixed bottom-4 right-4">
      Connected to Avail Network
    </Badge>
  );
};

export default Status;
