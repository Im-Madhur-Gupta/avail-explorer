import { z } from "zod";
import { isValidSubstrateAddress } from "@/modules/actions/utils/address.utils";

export const baseBalanceTransferSchema = z.object({
  recipient: z
    .string()
    .min(1, "Recipient address is required")
    .refine(isValidSubstrateAddress, "Invalid substrate address"),
});
