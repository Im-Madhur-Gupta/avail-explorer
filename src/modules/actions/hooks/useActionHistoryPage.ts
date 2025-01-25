import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useExtrinsics } from "./useExtrinsics";
import { WalletStatus } from "@/modules/common/enums/wallet-status.enum";

export const useActionHistoryPage = () => {
  const account = useAppStore((state) => state.account);
  const status = useAppStore((state) => state.status);

  const { ref, inView } = useInView();

  const isConnected = status === WalletStatus.CONNECTED;
  const isConnecting = status === WalletStatus.CONNECTING;

  const {
    data,
    isLoading: isExtrinsicsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    refetch,
  } = useExtrinsics({
    signer: account?.address ?? "",
    enabled: isConnected,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    ref,
    data,
    isConnected,
    isLoading: isConnecting || isExtrinsicsLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};
