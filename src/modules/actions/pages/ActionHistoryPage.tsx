"use client";

import { MissingWalletCard } from "@/modules/common/components/MissingWalletCard";
import ActionHistoryTable from "@/modules/actions/components/ActionHistoryTable";
import ActionHistoryTableSkeleton from "@/modules/actions/components/ActionHistoryTableSkeleton";
import ActionHistoryError from "@/modules/actions/components/ActionHistoryError";
import ActionHistoryPageLoader from "@/modules/actions/components/ActionHistoryPageLoader";
import { useActionHistoryPage } from "@/modules/actions/hooks/useActionHistoryPage";

const ActionHistoryPage = () => {
  const {
    ref,
    data,
    isConnected,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useActionHistoryPage();

  return (
    <div className="max-w-screen-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Actions History</h2>
        <p className="text-muted-foreground">
          View your action history on the Avail Turing network
        </p>
      </div>

      {isLoading ? (
        <ActionHistoryTableSkeleton />
      ) : !isConnected ? (
        <MissingWalletCard />
      ) : isError ? (
        <ActionHistoryError onRetry={refetch} />
      ) : (
        <>
          <ActionHistoryTable data={data} />
          {hasNextPage && (
            <div ref={ref}>
              {isFetchingNextPage ? <ActionHistoryPageLoader /> : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActionHistoryPage;
