import { ApiPromise, initialize, signedExtensions, types } from "avail-js-sdk";
import { isNumber } from "@polkadot/util";
import type { MetadataDef } from "@polkadot/extension-inject/types";
import type { StoreApi } from "zustand";

import {
  WalletState,
  WalletActions,
  InjectedWeb3Entry,
} from "@/modules/common/interfaces/wallet.interface";
import { WalletStatus } from "@/modules/common/enums/wallet-status.enum";
import { StoreState } from "../createStore";
import { initialChainInteractionState } from "@/modules/actions/store/slices/chainInteractionSlice";

export interface WalletSlice extends WalletState, WalletActions {}

type SetState = StoreApi<StoreState>["setState"];
type GetState = StoreApi<StoreState>["getState"];

export const initialWalletState: WalletState = {
  status: WalletStatus.DISCONNECTED,
  account: null,
  initializedExtensions: new Set(),
  balance: null,
};

export const createWalletSlice = (set: SetState, get: GetState) => ({
  ...initialWalletState,

  /**
   * Connects wallet and populates wallet state
   */
  connect: async (): Promise<void> => {
    try {
      set({
        status: WalletStatus.CONNECTING,
      });

      const { web3Enable, web3Accounts } = await import(
        "@polkadot/extension-dapp"
      );

      await web3Enable("Avail Explorer");
      const web3Provider = (
        window as Window & { injectedWeb3?: Record<string, InjectedWeb3Entry> }
      ).injectedWeb3;

      if (!web3Provider) {
        throw new Error("No injected web3 provider found");
      }

      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const account = accounts[0];
      const availApi = await initialize("wss://turing-rpc.avail.so/ws");
      const extension = account.meta.source;

      if (extension === "") {
        throw new Error("No extension found");
      }

      // Initialize the extension for the connected account
      const wasExtensionInitialized = await get().initializeExtension(
        extension,
        availApi
      );

      set((state) => ({
        status: WalletStatus.CONNECTED,
        account,
        availApi,
        // Add extension to initialized extensions if it was not already initialized
        ...(wasExtensionInitialized
          ? {
              initializedExtensions: new Set([
                ...state.initializedExtensions,
                extension,
              ]),
            }
          : {}),
      }));

      // Update balance after successful connection
      await get().updateBalance();
    } catch (error) {
      console.error("Failed to connect wallet", error);
      set({
        status: WalletStatus.DISCONNECTED,
      });
    }
  },

  /**
   * Initializes wallet extension with Avail network metadata
   * @param extension - Extension identifier
   * @param availApi - Avail API instance
   * @returns boolean indicating if initialization was performed
   */
  initializeExtension: async (
    extension: string,
    availApi: ApiPromise
  ): Promise<boolean> => {
    try {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      const injector = await web3FromSource(extension);

      const signer = injector.signer;

      // Update chain interaction state
      set({
        availApi,
        signer,
      });

      const initializedExtensions = get().initializedExtensions;
      // Skip if extension is already initialized
      if (initializedExtensions.has(extension)) {
        return false;
      }

      if (!injector.metadata) {
        throw new Error("No metadata found");
      }

      // Configure metadata for the Avail network
      const metadata: MetadataDef = {
        chain: availApi.runtimeChain.toString(),
        specVersion: availApi.runtimeVersion.specVersion.toNumber(),
        tokenDecimals: availApi.registry.chainDecimals[0] || 18,
        tokenSymbol: availApi.registry.chainTokens[0] || "AVAIL",
        genesisHash: availApi.genesisHash.toHex(),
        ss58Format: isNumber(availApi.registry.chainSS58)
          ? availApi.registry.chainSS58
          : 0,
        chainType: "substrate",
        icon: "substrate",
        types: types as unknown as Record<
          string,
          string | Record<string, string>
        >,
        userExtensions: signedExtensions,
      };

      await injector.metadata.provide(metadata);

      return true;
    } catch (error) {
      console.error("Failed to initialize extension", error);
      throw error;
    }
  },

  /**
   * Disconnects wallet and resets state
   */
  disconnect: async (): Promise<void> => {
    try {
      set({ status: WalletStatus.DISCONNECTING });

      const availApi = get().availApi;
      if (availApi) {
        await availApi.disconnect();
      }

      set({
        ...initialWalletState,
        ...initialChainInteractionState,
      });
    } catch (error) {
      console.error("Failed to disconnect wallet", error);
      set({ status: WalletStatus.DISCONNECTED });
    }
  },

  updateBalance: async (): Promise<void> => {
    try {
      const { availApi, account } = get();

      if (!availApi || !account) {
        set({ balance: null });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await availApi.query.system.account(account.address);
      set({ balance: result["data"]["free"].toBigInt() });
    } catch (error) {
      console.error("Failed to update balance", error);
      set({ balance: null });
    }
  },
});
