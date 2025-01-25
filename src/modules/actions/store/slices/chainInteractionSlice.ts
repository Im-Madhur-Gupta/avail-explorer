import type { SignerOptions } from "@polkadot/api/types";
import type { ISubmittableResult } from "@polkadot/types/types";
import type { StoreApi } from "zustand";
import {
  ChainInteractionState,
  ChainInteractionActions,
} from "@/modules/actions/interfaces/chain-interaction.interface";
import { StoreState } from "@/modules/common/store/createStore";

export interface ChainInteractionSlice
  extends ChainInteractionState,
    ChainInteractionActions {}

type SetState = StoreApi<StoreState>["setState"];
type GetState = StoreApi<StoreState>["getState"];

export const initialChainInteractionState: ChainInteractionState = {
  availApi: null,
  signer: null,
};

export const createChainInteractionSlice = (set: SetState, get: GetState) => ({
  ...initialChainInteractionState,

  submitData: async (
    data: string,
    appId: number
  ): Promise<ISubmittableResult> => {
    try {
      const { availApi, signer, account } = get();

      if (!account) {
        throw new Error("Account not initialized");
      }

      if (!availApi || !signer) {
        throw new Error("Chain interaction not initialized");
      }

      return new Promise((resolve, reject) => {
        const trx = availApi.tx.dataAvailability.submitData(data);
        trx.signAndSend(
          account.address,
          {
            signer,
            app_id: appId,
          } as Partial<SignerOptions>,
          (result) => {
            if (result.isError) {
              reject(result);
            }
            // TODO: When transaction is part of a block, we can say 'Pending', but we need to wait for the block to be finalized. Can be handled when we add action tracking.
            if (result.status.isFinalized) {
              resolve(result);
            }
          }
        );
      });
    } catch (error) {
      console.error("Error submitting data", error);
      throw error;
    }
  },
});
