import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useWalletStatus } from "@/modules/common/hooks/useWalletStatus";
import { useExtrinsics } from "@/modules/actions/hooks/useExtrinsics";

export const useActionHistoryPage = () => {
  const { ref, inView } = useInView();

  const account = useAppStore((state) => state.account);
  const { isConnected, isConnecting } = useWalletStatus();
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
    enabled: isConnected, // Enabled only when wallet is connected
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
