import type { ApiPromise } from "avail-js-sdk";
import type { Signer } from "@polkadot/api/types";
import type { ISubmittableResult } from "@polkadot/types/types";

import { TransferType } from "@/modules/actions/enums/transfer-type.enum";
import type { TransferParams } from "@/modules/actions/interfaces/transfer-params.interface";

export interface ChainInteractionState {
  availApi: ApiPromise | null;
  signer: Signer | null;
}

export interface ChainInteractionActions {
  submitData: (data: string, appId?: number) => Promise<ISubmittableResult>;
  estimateFeeForSubmitData: (data: string) => Promise<bigint>;
  transferKeepAlive: (
    recipient: string,
    amount: string
  ) => Promise<ISubmittableResult>;
  transferAllowDeath: (
    recipient: string,
    amount: string
  ) => Promise<ISubmittableResult>;
  transferAll: (
    recipient: string,
    keepAlive: boolean
  ) => Promise<ISubmittableResult>;
  estimateFeeForTransfer: (
    transferType: TransferType,
    params: TransferParams
  ) => Promise<bigint>;
}
