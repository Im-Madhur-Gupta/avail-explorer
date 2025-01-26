import {
  formatNumberToBalance,
  getDecimals,
  type ApiPromise,
} from "avail-js-sdk";
import type { SignerOptions } from "@polkadot/api/types";
import type { ISubmittableResult, Signer } from "@polkadot/types/types";
import type { StoreApi } from "zustand";

import { StoreState } from "@/modules/common/store/createStore";
import { getValidatedParam } from "@/modules/actions/utils/validation.utils";
import { TransferType } from "@/modules/actions/enums/transfer-type.enum";
import type {
  ChainInteractionState,
  ChainInteractionActions,
} from "@/modules/actions/interfaces/chain-interaction.interface";
import type { WalletAccount } from "@/modules/common/interfaces/wallet.interface";
import type { TransferParams } from "@/modules/actions/interfaces/transfer-params.interface";
import { ActionType } from "../enums/action-type.enum";

export interface ChainInteractionSlice
  extends ChainInteractionState,
    ChainInteractionActions {}

type SetState = StoreApi<StoreState>["setState"];
type GetState = StoreApi<StoreState>["getState"];

/**
 * Manages state and actions for blockchain interactions including data submission and transfers
 */
export const initialChainInteractionState: ChainInteractionState = {
  availApi: null,
  signer: null,
};

export const createChainInteractionSlice = (set: SetState, get: GetState) => ({
  ...initialChainInteractionState,

  /**
   * Submits data to the blockchain
   * @param data - Data to submit
   * @param appId - Optional application ID
   * @returns Promise resolving to submission result
   */
  submitData: async (
    data: string,
    appId?: number
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

        const options = {
          signer,
          ...(appId ? { app_id: appId } : {}),
        } as Partial<SignerOptions>;

        trx.signAndSend(account.address, options, (result) => {
          if (result.isError) {
            reject(result);
          }

          // Start tracking when we have the hash and resolve
          if (result.status.isReady) {
            const hash = result.txHash.toString();
            get().trackAction(hash, ActionType.SUBMIT_DATA);
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.error("Error in submitData", error);
      throw error;
    }
  },

  /**
   * Estimates fee for data submission
   * @param data - Data to submit
   * @returns Promise resolving to estimated fee in native tokens
   */
  estimateFeeForSubmitData: async (data: string): Promise<bigint> => {
    try {
      const { availApi: _api, account: _account } = get();
      const api = getValidatedParam<ApiPromise>(_api);
      const account = getValidatedParam<WalletAccount>(_account);

      const tx = api.tx.dataAvailability.submitData(data);
      const paymentInfo = await tx.paymentInfo(account.address);
      return paymentInfo.partialFee.toBigInt();
    } catch (error) {
      console.error("Error in estimateFeeForDataSubmission", error);
      throw error;
    }
  },

  /**
   * Transfers tokens while keeping minimum balance for account existence
   * @param recipient - Recipient address
   * @param amount - Amount to transfer
   * @returns Promise resolving to transfer result
   */
  transferKeepAlive: async (
    recipient: string,
    amount: string
  ): Promise<ISubmittableResult> => {
    try {
      const { availApi: _api, signer: _signer, account: _account } = get();
      const api = getValidatedParam<ApiPromise>(_api);
      const signer = getValidatedParam<Signer>(_signer);
      const account = getValidatedParam<WalletAccount>(_account);

      const decimals = getDecimals(api);
      const parsedAmount = formatNumberToBalance(amount, decimals);

      return new Promise((resolve, reject) => {
        api.tx.balances
          .transferKeepAlive(recipient, parsedAmount)
          .signAndSend(
            account.address,
            { signer },
            (result: ISubmittableResult) => {
              if (result.isError) {
                reject(result);
              }

              // Start tracking when we have the hash and resolve
              if (result.status.isReady) {
                const hash = result.txHash.toString();
                get().trackAction(hash, ActionType.TRANSFER);
                resolve(result);
              }
            }
          );
      });
    } catch (error) {
      console.error("Error in transferKeepAlive", error);
      throw error;
    }
  },

  /**
   * Transfers tokens allowing account to be deleted if emptied
   * @param recipient - Recipient address
   * @param amount - Amount to transfer
   * @returns Promise resolving to transfer result
   */
  transferAllowDeath: async (
    recipient: string,
    amount: string
  ): Promise<ISubmittableResult> => {
    try {
      const { availApi: _api, signer: _signer, account: _account } = get();
      const api = getValidatedParam<ApiPromise>(_api);
      const signer = getValidatedParam<Signer>(_signer);
      const account = getValidatedParam<WalletAccount>(_account);

      const decimals = getDecimals(api);
      const parsedAmount = formatNumberToBalance(amount, decimals);

      return new Promise((resolve, reject) => {
        api.tx.balances
          .transferAllowDeath(recipient, parsedAmount)
          .signAndSend(
            account.address,
            { signer },
            (result: ISubmittableResult) => {
              if (result.isError) {
                reject(result);
              }

              // Start tracking when we have the hash and resolve
              if (result.status.isReady) {
                const hash = result.txHash.toString();
                get().trackAction(hash, ActionType.TRANSFER);
                resolve(result);
              }
            }
          );
      });
    } catch (error) {
      console.error("Error in transferAllowDeath", error);
      throw error;
    }
  },

  /**
   * Transfers all tokens from account
   * @param recipient - Recipient address
   * @param keepAlive - Whether to keep minimum balance for account existence
   * @returns Promise resolving to transfer result
   */
  transferAll: async (
    recipient: string,
    keepAlive: boolean
  ): Promise<ISubmittableResult> => {
    try {
      const { availApi: _api, signer: _signer, account: _account } = get();
      const api = getValidatedParam<ApiPromise>(_api);
      const signer = getValidatedParam<Signer>(_signer);
      const account = getValidatedParam<WalletAccount>(_account);

      return new Promise((resolve, reject) => {
        api.tx.balances
          .transferAll(recipient, keepAlive)
          .signAndSend(
            account.address,
            { signer },
            (result: ISubmittableResult) => {
              if (result.isError) {
                reject(result);
              }

              // Start tracking when we have the hash
              if (result.status.isReady) {
                const hash = result.txHash.toString();
                get().trackAction(hash, ActionType.TRANSFER);
                resolve(result);
              }
            }
          );
      });
    } catch (error) {
      console.error("Error in transferAll", error);
      throw error;
    }
  },

  /**
   * Estimates fee for token transfer
   * @param transferType - Type of transfer (KeepAlive/AllowDeath/All)
   * @param params - Transfer parameters
   * @returns Promise resolving to estimated fee in native tokens
   */
  estimateFeeForTransfer: async (
    transferType: TransferType,
    params: TransferParams
  ): Promise<bigint> => {
    try {
      const { availApi: _api, account: _account } = get();
      const api = getValidatedParam<ApiPromise>(_api);
      const account = getValidatedParam<WalletAccount>(_account);

      let transaction;
      switch (transferType) {
        case TransferType.KeepAlive:
          if (!params.amount) {
            throw new Error("Amount required for keepAlive transfer");
          }

          const parsedAmount = formatNumberToBalance(
            params.amount,
            getDecimals(api)
          );

          transaction = api.tx.balances.transferKeepAlive(
            params.recipient,
            parsedAmount
          );
          break;

        case TransferType.AllowDeath:
          if (!params.amount) {
            throw new Error("Amount required for allowDeath transfer");
          }

          const parsedAllowDeathAmount = formatNumberToBalance(
            params.amount,
            getDecimals(api)
          );
          transaction = api.tx.balances.transferAllowDeath(
            params.recipient,
            parsedAllowDeathAmount
          );
          break;

        case TransferType.All:
          if (!params.keepAlive) {
            throw new Error("KeepAlive flag required for all transfer");
          }

          transaction = api.tx.balances.transferAll(
            params.recipient,
            params.keepAlive
          );
          break;
      }

      const paymentInfo = await transaction.paymentInfo(account.address);
      const partialFee = paymentInfo.partialFee.toBigInt();

      return partialFee;
    } catch (error) {
      console.error("Error in estimateFeeForTransfer", error);
      throw error;
    }
  },
});
