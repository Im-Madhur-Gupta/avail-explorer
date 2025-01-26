import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useToast } from "@/modules/common/hooks/use-toast";
import { dataSubmissionSchema } from "@/modules/actions/schemas/data-submission.schema";
import { useShallow } from "zustand/react/shallow";
import { useActionHandler } from "./useActionHandler";
import { EXISTENTIAL_BALANCE } from "../constants/balance.constants";

type DataSubmissionForm = z.infer<typeof dataSubmissionSchema>;

export const useDataSubmission = () => {
  const { toast } = useToast();

  const { balance, submitData, estimateFeeForSubmitData } = useAppStore(
    useShallow((state) => ({
      balance: state.balance,
      submitData: state.submitData,
      estimateFeeForSubmitData: state.estimateFeeForSubmitData,
    }))
  );
  const {
    formattedEstimatedFee,
    isEstimatingFee,
    txReceipt,
    estimateFeeHandler,
    performActionHandler,
    clearTxReceipt,
    clearEstimatedFee,
  } = useActionHandler();

  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);

  const form = useForm<DataSubmissionForm>({
    resolver: zodResolver(dataSubmissionSchema),
    defaultValues: {
      data: "",
      appId: "",
    },
    mode: "onChange",
  });

  const debouncedHandleEstimateFee = useDebouncedCallback(async () => {
    try {
      const { data } = form.getValues();
      // Skip fee estimation if balance is not loaded or form is invalid
      if (balance === null || !form.formState.isValid) {
        // Reset balance status and clear fee estimate
        setIsBalanceSufficient(true);
        clearEstimatedFee();
        return;
      }

      await estimateFeeHandler(async () => {
        const fee = await estimateFeeForSubmitData(data);

        // Check if balance is sufficient for the fee and existential deposit
        const totalRequired = fee + EXISTENTIAL_BALANCE;
        setIsBalanceSufficient(totalRequired <= balance);

        return fee;
      });
    } catch (error) {
      console.error("Fee estimation failed:", error);
      toast({
        title: "Failed to estimate fee for data submission",
        variant: "destructive",
      });
    }
  }, 500);

  const handleSubmit = async (values: DataSubmissionForm) => {
    try {
      const { data, appId } = values;
      const parsedAppId = appId ? Number(appId) : undefined;
      await performActionHandler(() => submitData(data, parsedAppId));

      toast({
        title: "Data submitted successfully.",
      });

      form.reset();
    } catch (error) {
      console.error("Data submission failed", error);
      toast({
        title: "Data submission failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Estimate fee on form data change
  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedHandleEstimateFee();
    });

    return () => subscription.unsubscribe();
  }, [debouncedHandleEstimateFee, form]);

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    estimatedFee: formattedEstimatedFee,
    isEstimatingFee,
    isBalanceSufficient,
    txReceipt,
    handleSubmit: form.handleSubmit(handleSubmit),
    clearTxReceipt,
  };
};
