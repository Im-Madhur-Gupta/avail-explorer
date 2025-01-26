"use client";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ActionStatus } from "@/modules/actions/enums/action-status.enum";
import PendingActionDetails from "@/modules/actions/components/PendingActionDetails";
import ConfirmedActionDetails from "@/modules/actions/components/ConfirmedActionDetails";

const ActionDetailsPage = () => {
  const { hash } = useParams<{ hash: string }>();
  const actions = useAppStore((state) => state.trackedActions);
  const action = actions[hash];
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    // Only allow fetching from indexer if:
    // 1. Action doesn't exist (old transaction)
    // 2. Action exists but is finalized (indexer should have caught up)
    if (!action || action.status === ActionStatus.SUCCESS) {
      setShouldFetch(true);
    }
  }, [action]);

  // If the action exists but hasn't been fetched yet, show pending action details
  if (action && !shouldFetch) {
    return <PendingActionDetails action={action} />;
  }

  // Otherwise, show confirmed action details
  return <ConfirmedActionDetails hash={hash} />;
};

export default ActionDetailsPage;
