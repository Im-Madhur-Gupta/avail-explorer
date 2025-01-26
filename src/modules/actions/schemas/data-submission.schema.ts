import { z } from "zod";

export const dataSubmissionSchema = z.object({
  appId: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Allow empty string or undefined
        if (!val) return true;

        // Check if it's a valid integer >= 0
        const num = Number(val);
        return Number.isInteger(num) && num >= 0;
      },
      {
        message: "App ID must be an integer greater than or equal to 0",
      }
    ),
  data: z.string().min(1, "Data is required"),
});
