import { createStore as createZustandStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  WalletSlice,
  createWalletSlice,
  initialWalletState,
} from "./slices/walletSlice";

// Combine all slices here
export type StoreState = WalletSlice;

export const defaultInitState: Partial<StoreState> = {
  ...initialWalletState,
};

export const createStore = (
  initState: Partial<StoreState> = defaultInitState
) => {
  return createZustandStore<StoreState>()(
    persist(
      (set, get) => ({
        ...initState,
        ...createWalletSlice(set, get),
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
