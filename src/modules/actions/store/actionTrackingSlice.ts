/**
 * Manages state and actions for tracking blockchain transactions
 */
import type { ApiPromise } from "avail-js-sdk";
import type { StoreApi } from "zustand";
import type { EventRecord } from "@polkadot/types/interfaces";

import { toast } from "@/modules/common/hooks/use-toast";
import { StoreState } from "@/modules/common/store/createStore";
import { ActionType } from "@/modules/actions/enums/action-type.enum";
import { ActionStatus } from "@/modules/actions/enums/action-status.enum";
import type {
  ActionTrackingActions,
  ActionTrackingState,
} from "@/modules/actions/interfaces/action-tracking.interface";

export interface ActionTrackingSlice
  extends ActionTrackingState,
    ActionTrackingActions {}

type SetState = StoreApi<StoreState>["setState"];
type GetState = StoreApi<StoreState>["getState"];

/**
 * Initial state for action tracking
 */
export const initialActionTrackingState: ActionTrackingState = {
  trackedActions: {},
};

export const createActionTrackingSlice = (set: SetState, get: GetState) => ({
  ...initialActionTrackingState,

  /**
   * Subscribes to finalized blocks and processes them for tracked actions
   */
  subscribeFinalizedBlocks: async () => {
    try {
      console.log("Starting subscription for finalized blocks");

      const { availApi, processFinalizedBlock } = get();

      if (!availApi) {
        console.warn(
          "API not initialized. Cannot subscribe to finalized blocks."
        );
        return;
      }

      // Subscribe to finalized blocks
      await availApi.rpc.chain.subscribeFinalizedHeads(async (header) => {
        const blockHash = header.hash.toHex();
        console.log(`Processing finalized block ${blockHash}`);
        await processFinalizedBlock(availApi, blockHash);
      });
    } catch (error) {
      console.error("Error subscribing to finalized blocks:", error);
    }
  },

  /**
   * Processes a finalized block to update status of tracked actions
   * @param availApi - Avail API instance
   * @param blockHash - Hash of the finalized block
   */
  processFinalizedBlock: async (availApi: ApiPromise, blockHash: string) => {
    try {
      const block = await availApi.rpc.chain.getBlock(blockHash);
      const events = await availApi.query.system.events();
      const { trackedActions } = get();

      // Process all tracked actions for this block
      Object.entries(trackedActions).forEach(([hash, action]) => {
        if (action.status !== ActionStatus.PENDING) return;

        const found = block.block.extrinsics.find(
          (ext) => ext.hash.toHex() === hash
        );

        if (found) {
          console.log(`Transaction ${hash} found in block ${blockHash}`);
          const success = (
            events as unknown as { toArray: () => EventRecord[] }
          )
            .toArray()
            .some((record) => {
              const { event } = record;
              return availApi.events.system.ExtrinsicSuccess.is(event);
            });

          console.log(
            `Transaction ${hash} ${
              success ? ActionStatus.SUCCESS : ActionStatus.FAILED
            }`
          );
          get().updateActionStatus(
            hash,
            success ? ActionStatus.SUCCESS : ActionStatus.FAILED
          );
        }
      });
    } catch (error) {
      console.error("Error processing finalized block:", error);
    }
  },

  /**
   * Tracks a new blockchain action
   * @param hash - Transaction hash
   * @param type - Type of action (data submission/transfer)
   */
  trackAction: (hash: string, type: ActionType) => {
    try {
      console.log("trackAction", hash, type);

      set((state) => ({
        ...state,
        trackedActions: {
          ...state.trackedActions,
          [hash]: {
            hash,
            type,
            status: ActionStatus.PENDING,
            timestamp: Date.now(),
          },
        },
      }));

      toast({
        title: "Action Sent",
        description: `${
          type === ActionType.SUBMIT_DATA ? "Data submission" : "Transfer"
        } initiated`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error tracking action:", error);
      get().updateActionStatus(hash, ActionStatus.FAILED);
    }
  },

  /**
   * Updates status of a tracked action
   * @param hash - Transaction hash
   * @param status - New action status
   */
  updateActionStatus: (hash: string, status: ActionStatus) => {
    set((state) => ({
      trackedActions: {
        ...state.trackedActions,
        [hash]: {
          ...state.trackedActions[hash],
          status,
        },
      },
    }));

    if (status === ActionStatus.SUCCESS) {
      toast({
        title: "Action Successful",
        description: "Your action has been successfully processed",
        variant: "default",
      });
    } else if (status === ActionStatus.FAILED) {
      toast({
        title: "Action Failed",
        description: "There was an error processing your action",
        variant: "destructive",
      });
    }
  },

  /**
   * Clears all tracked actions from state
   */
  clearTrackedActions: () => {
    set({ ...initialActionTrackingState });
  },
});
