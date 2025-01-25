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
import TransactionReceipt from "./TransactionReceipt";

const DataSubmission = () => {
  const { form, handleSubmit, isSubmitting, isValid, txReceipt } =
    useDataSubmission();

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="appId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App ID</FormLabel>
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

        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
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

        {txReceipt && <TransactionReceipt txReceipt={txReceipt} />}

        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-sm font-medium">Estimated Fees</div>
          <div className="mt-1 text-2xl font-bold">0.0 AVAIL</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Final fee may vary based on network conditions
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Submitting..." : "Submit Data"}
        </Button>
      </div>
    </Form>
  );
};

export default DataSubmission;
