import { createStore as createZustandStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  WalletSlice,
  createWalletSlice,
  initialWalletState,
} from "../store/slices/walletSlice";
import {
  createChainInteractionSlice,
  initialChainInteractionState,
  type ChainInteractionSlice,
} from "@/modules/actions/store/slices/chainInteractionSlice";
import {
  ActionTrackingSlice,
  createActionTrackingSlice,
  initialActionTrackingState,
} from "@/modules/actions/store/slices/actionTrackingSlice";

// Combine all slices here
export type StoreState = WalletSlice &
  ChainInteractionSlice &
  ActionTrackingSlice;

export const defaultInitState: Partial<StoreState> = {
  ...initialWalletState,
  ...initialChainInteractionState,
  ...initialActionTrackingState,
};

export const createStore = (
  initState: Partial<StoreState> = defaultInitState
) => {
  return createZustandStore<StoreState>()(
    persist(
      (set, get) => ({
        ...initState,
        ...createWalletSlice(set, get),
        ...createChainInteractionSlice(set, get),
        ...createActionTrackingSlice(set, get),
      }),
      {
        name: "avail-explorer-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          account: state.account,
          // Convert initializedExtensions to an array before persisting
          initializedExtensions: Array.from(state.initializedExtensions),
          trackedActions: state.trackedActions,
        }),
        onRehydrateStorage: () => (state) => {
          if (!state) {
            return;
          }

          // Ensure trackedActions is a proper Record
          if (state.trackedActions) {
            state.trackedActions = Object.fromEntries(
              Object.entries(state.trackedActions)
            );
          }

          // Convert initializedExtensions to a Set after rehydration
          state.initializedExtensions = new Set(state.initializedExtensions);
          return state;
        },
      }
    )
  );
};
