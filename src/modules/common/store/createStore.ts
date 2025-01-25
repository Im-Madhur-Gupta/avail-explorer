import { createStore as createZustandStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createWalletSlice,
  initialWalletState,
  type WalletSlice,
} from "./slices/walletSlice";
import {
  createChainInteractionSlice,
  initialChainInteractionState,
  type ChainInteractionSlice,
} from "@/modules/actions/store/slices/chainInteractionSlice";

// Combine all slices here
export type StoreState = WalletSlice & ChainInteractionSlice;

export const defaultInitState: Partial<StoreState> = {
  ...initialWalletState,
  ...initialChainInteractionState,
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
      }),
      {
        name: "avail-x-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          account: state.account,
          // Convert initializedExtensions to an array before persisting
          initializedExtensions: Array.from(state.initializedExtensions),
        }),
        onRehydrateStorage: () => (state) => {
          if (!state) {
            return;
          }

          // Convert initializedExtensions to a Set after rehydration
          state.initializedExtensions = new Set(state.initializedExtensions);
          return state;
        },
      }
    )
  );
};
