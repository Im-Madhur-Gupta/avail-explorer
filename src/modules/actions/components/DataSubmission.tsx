import { useDataSubmission } from "../hooks/useDataSubmission";
import { Button } from "@/modules/common/components/ui/button";
import { Input } from "@/modules/common/components/ui/input";
import { Textarea } from "@/modules/common/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import ActionFeeEstimate from "./ActionFeeEstimate";

const DataSubmission = () => {
  const {
    form,
    isSubmitting,
    isValid,
    estimatedFee,
    isEstimatingFee,
    isBalanceSufficient,
    handleSubmit,
  } = useDataSubmission();

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter data to submit"
                  className="min-h-[100px]"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>App ID</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        App ID to which you want to submit data. Defaults to 0
                        if not specified.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter application ID"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <ActionFeeEstimate
          isEstimatingFee={isEstimatingFee}
          estimatedFee={estimatedFee}
        />

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={
            isSubmitting || !isValid || isEstimatingFee || !isBalanceSufficient
          }
        >
          {!isBalanceSufficient
            ? "Insufficient Balance"
            : isSubmitting
            ? "Submitting..."
            : "Submit Data"}
        </Button>
      </div>
    </Form>
  );
};

export default DataSubmission;
