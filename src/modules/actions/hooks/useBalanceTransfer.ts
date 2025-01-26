import { useState, useEffect, useCallback, useMemo } from "react";
import { formatNumberToBalance, getDecimals } from "avail-js-sdk";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";
import { useDebouncedCallback } from "use-debounce";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useToast } from "@/modules/common/hooks/use-toast";
import { formatAmount } from "@/modules/common/utils/amount.utils";
import { isValidSubstrateAddress } from "@/modules/actions/utils/address.utils";
import { TransferType } from "@/modules/actions/enums/transfer-type.enum";
import { EXISTENTIAL_BALANCE } from "@/modules/actions/constants/balance.constants";
import { baseBalanceTransferSchema } from "@/modules/actions/schemas/balance-transfer.schema";

export const useBalanceTransfer = () => {
  const { toast } = useToast();
  const {
    balance,
    availApi,
    estimateFeeForTransfer,
    transferKeepAlive,
    transferAllowDeath,
  } = useAppStore(
    useShallow((state) => ({
      balance: state.balance,
      availApi: state.availApi,
      estimateFeeForTransfer: state.estimateFeeForTransfer,
      transferKeepAlive: state.transferKeepAlive,
      transferAllowDeath: state.transferAllowDeath,
    }))
  );

  const [isKeepAlive, setIsKeepAlive] = useState(true);
  const [estimatedFee, setEstimatedFee] = useState<bigint | null>(null);
  const [isEstimatingFee, setIsEstimatingFee] = useState(false);

  // Form validation

  const validateTransfer = useCallback(
    (
      amount: string
    ): {
      isValid: boolean;
      errorMessage?: string;
    } => {
      if (!availApi || !balance) {
        return { isValid: true };
      }

      const decimals = getDecimals(availApi);
      const parsedAmount = formatNumberToBalance(Number(amount), decimals);
      const amountInBigInt = BigInt(parsedAmount.toString());

      // Check if the amount exceeds the balance when the fee is not yet estimated
      if (amountInBigInt >= balance) {
        return {
          isValid: false,
          errorMessage: "Not enough balance to cover the transfer and fees",
        };
      }

      if (!estimatedFee) {
        return { isValid: true };
      }

      const totalRequired = amountInBigInt + estimatedFee;
      if (totalRequired > balance) {
        return {
          isValid: false,
          errorMessage: "Not enough balance to cover the transfer and fees",
        };
      }

      const remainingBalance = balance - totalRequired;
      const minRequired = isKeepAlive ? EXISTENTIAL_BALANCE : 0n;

      if (remainingBalance < minRequired) {
        return {
          isValid: false,
          errorMessage: isKeepAlive
            ? "Transfer will reduce your balance below the existential deposit"
            : "Not enough balance to cover the transfer and fees",
        };
      }

      return { isValid: true };
    },
    [balance, estimatedFee, isKeepAlive, availApi]
  );

  const extendedBalanceTransferSchema = useMemo(
    () =>
      baseBalanceTransferSchema.extend({
        amount: z.string().superRefine((val, ctx) => {
          const parsedAmount = Number(val);
          if (isNaN(parsedAmount) || parsedAmount <= 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Amount must be a positive number",
            });
          }

          const validationResult = validateTransfer(val);
          if (!validationResult.isValid) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: validationResult.errorMessage,
            });
          }
        }),
      }),
    [validateTransfer]
  );

  const form = useForm<z.infer<typeof extendedBalanceTransferSchema>>({
    defaultValues: {
      recipient: "",
      amount: "",
    },
    resolver: zodResolver(extendedBalanceTransferSchema),
    mode: "onChange",
  });

  // Transfer fee estimation

  const estimateTransferFee = useCallback(
    async (amount: string, recipient: string) => {
      try {
        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          return null;
        }

        if (!isValidSubstrateAddress(recipient)) {
          return null;
        }

        const transferType = isKeepAlive
          ? TransferType.KeepAlive
          : TransferType.AllowDeath;

        // TODO: Handle for transferAll

        const fee = await estimateFeeForTransfer(transferType, {
          recipient,
          amount,
          keepAlive: isKeepAlive,
        });

        return fee;
      } catch (error) {
        console.error("Fee estimation failed:", error);
        return null;
      }
    },
    [isKeepAlive, estimateFeeForTransfer]
  );

  const debouncedEstimateFee = useDebouncedCallback(async () => {
    const { amount, recipient } = form.getValues();

    setIsEstimatingFee(true);

    const fee = await estimateTransferFee(amount, recipient);

    setEstimatedFee(fee);
    setIsEstimatingFee(false);
  }, 500);

  // Form submission and cleanup

  const handleSubmit = async (
    values: z.infer<typeof extendedBalanceTransferSchema>
  ) => {
    try {
      const transferFn = isKeepAlive ? transferKeepAlive : transferAllowDeath;
      await transferFn(values.recipient, values.amount);

      form.reset();
      setEstimatedFee(null);
    } catch (error) {
      console.error("Transfer failed:", error);
      toast({
        title: "Transfer failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Effects

  // Estimate fee on form data change
  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedEstimateFee();
    });

    return () => subscription.unsubscribe();
  }, [debouncedEstimateFee, form]);

  // Re-estimate fee on isKeepAlive change
  useEffect(() => {
    debouncedEstimateFee();
  }, [debouncedEstimateFee, isKeepAlive]);

  // Computed values

  const getFormattedFee = (fee: bigint | null) => {
    if (!fee || !availApi) {
      return null;
    }
    const decimals = getDecimals(availApi);
    return formatAmount(fee, decimals);
  };
  const formattedEstimatedFee = getFormattedFee(estimatedFee);

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    isKeepAlive,
    setIsKeepAlive,
    estimatedFee: formattedEstimatedFee,
    isEstimatingFee,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
