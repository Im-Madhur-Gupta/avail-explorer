import { z } from "zod";

export const dataSubmissionSchema = z.object({
  appId: z
    .string()
    .min(1, "App ID is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "App ID must be a non-negative integer",
    }),
  data: z.string().min(1, "Data is required"),
});
