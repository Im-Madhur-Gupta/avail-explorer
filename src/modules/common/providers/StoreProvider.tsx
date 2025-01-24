"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type StoreState, createStore } from "../store/createStore";

export type StoreApi = ReturnType<typeof createStore>;

export const StoreContext = createContext<StoreApi | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();

    if (storeRef.current.getState().account) {
      storeRef.current.getState().connect();
    }
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: StoreState) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error("useAppStore must be used within StoreProvider");
  }
  return useStore(storeContext, selector);
};
