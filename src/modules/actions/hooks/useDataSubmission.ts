import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAppStore } from "@/modules/common/providers/StoreProvider";
import { useToast } from "@/modules/common/hooks/use-toast";
import type { TransactionReceipt } from "../interfaces/transaction-receipt.interface";

const dataSubmissionSchema = z.object({
  appId: z
    .string()
    .min(1, "App ID is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "App ID must be a non-negative integer",
    }),
  data: z.string().min(1, "Data is required"),
});

type DataSubmissionForm = z.infer<typeof dataSubmissionSchema>;

export const useDataSubmission = () => {
  const { toast } = useToast();
  const submitData = useAppStore((state) => state.submitData);

  const [txReceipt, setTxReceipt] = useState<TransactionReceipt | null>(null);

  const form = useForm<DataSubmissionForm>({
    resolver: zodResolver(dataSubmissionSchema),
    defaultValues: {
      appId: "",
      data: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: DataSubmissionForm) => {
    try {
      const result = await submitData(values.data, Number(values.appId));

      const blockId = result.status.asFinalized.toString();
      const txHash = result.txHash.toString();

      setTxReceipt({ blockId, txHash });

      toast({
        title: "Transaction submitted successfully",
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

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    txReceipt,
  };
};
