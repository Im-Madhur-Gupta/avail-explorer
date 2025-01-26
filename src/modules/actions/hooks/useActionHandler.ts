import { useState } from "react";
import { getDecimals } from "avail-js-sdk";
import { useShallow } from "zustand/react/shallow";
import type { ISubmittableResult } from "@polkadot/types/types";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { formatAmount } from "@/modules/common/utils/amount.utils";
import type { ActionReceipt } from "@/modules/actions/interfaces/action-receipt.interface";

export const useActionHandler = () => {
  const { availApi } = useAppStore(
    useShallow((state) => ({
      availApi: state.availApi,
    }))
  );

  const [actionReceipt, setActionReceipt] = useState<ActionReceipt | null>(
    null
  );
  const [estimatedFee, setEstimatedFee] = useState<bigint | null>(null);
  const [isEstimatingFee, setIsEstimatingFee] = useState(false);

  const estimateFeeHandler = async (
    estimateFee: () => Promise<bigint>
  ): Promise<void> => {
    try {
      setIsEstimatingFee(true);
      const fee = await estimateFee();
      setEstimatedFee(fee);
    } catch (error) {
      console.error("Fee estimation failed:", error);
      throw error;
    } finally {
      setIsEstimatingFee(false);
    }
  };

  const performActionHandler = async (
    performAction: () => Promise<ISubmittableResult>
  ): Promise<void> => {
    try {
      const result = await performAction();
      const blockId = result.status.asFinalized.toString();
      const txHash = result.txHash.toString();

      setActionReceipt({ blockId, txHash });
      setEstimatedFee(null);
    } catch (error) {
      console.error("Action failed", error);
      throw error;
    }
  };

  const clearEstimatedFee = () => {
    setEstimatedFee(null);
  };

  const clearActionReceipt = () => {
    setActionReceipt(null);
  };

  const getFormattedAmount = (amount: bigint | null) => {
    if (!amount || !availApi) {
      return null;
    }

    const decimals = getDecimals(availApi);
    return formatAmount(amount, decimals);
  };

  // Computed values

  const formattedEstimatedFee = getFormattedAmount(estimatedFee);

  return {
    actionReceipt,
    estimatedFee,
    formattedEstimatedFee,
    isEstimatingFee,
    estimateFeeHandler,
    performActionHandler,
    clearEstimatedFee,
    clearActionReceipt,
  };
};
