import { ApiPromise } from "avail-js-sdk";
import { ActionType } from "@/modules/actions/enums/action-type.enum";
import { ActionStatus } from "@/modules/actions/enums/action-status.enum";

export interface TrackedAction {
  hash: string;
  type: ActionType;
  status: ActionStatus;
  timestamp: number;
}

export interface ActionTrackingState {
  trackedActions: Record<string, TrackedAction>;
}

export interface ActionTrackingActions {
  subscribeFinalizedBlocks: () => void;
  processFinalizedBlock: (api: ApiPromise, blockHash: string) => void;
  trackAction: (hash: string, type: TrackedAction["type"]) => void;
  updateActionStatus: (hash: string, status: TrackedAction["status"]) => void;
  clearTrackedActions: () => void;
}
