import { ApiPromise } from "avail-js-sdk";
import { InjectedExtension } from "@polkadot/extension-inject/types";
import { WalletStatus } from "../enums/wallet-status.enum";

export interface WalletAccount {
  address: string;
  meta: {
    name?: string;
    source: string;
  };
}

export interface InjectedWeb3Entry {
  version: string;
  enable: (originName: string) => Promise<InjectedExtension>;
}

export interface WalletState {
  status: WalletStatus;
  availApi: ApiPromise | undefined;
  account: WalletAccount | null;
  initializedExtensions: Set<string>;
}

export interface WalletActions {
  connect: () => Promise<void>;
  initializeExtension: (source: string, availApi: ApiPromise) => Promise<boolean>;
  disconnect: () => Promise<void>;
}
