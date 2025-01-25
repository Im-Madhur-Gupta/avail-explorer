import type { ApiPromise } from "avail-js-sdk";
import type { Signer } from "@polkadot/api/types";
import type { ISubmittableResult } from "@polkadot/types/types";

export interface ChainInteractionState {
  availApi: ApiPromise | null;
  signer: Signer | null;
}

export interface ChainInteractionActions {
  submitData: (data: string, appId: number) => Promise<ISubmittableResult>;
}
