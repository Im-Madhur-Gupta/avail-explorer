import { Loader2 } from "lucide-react";

import { useBalanceTransfer } from "@/modules/actions/hooks/useBalanceTransfer";
import { Button } from "@/modules/common/components/ui/button";
import { Input } from "@/modules/common/components/ui/input";
import { Label } from "@/modules/common/components/ui/label";
import { Switch } from "@/modules/common/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form";
import TransactionReceiptModal from "@/modules/actions/components/TransactionReceiptModal";

const BalanceTransfer = () => {
  const {
    form,
    isSubmitting,
    isValid,
    isKeepAlive,
    estimatedFee,
    isEstimatingFee,
    txReceipt,
    handleSubmit,
    setIsKeepAlive,
    clearTxReceipt,
  } = useBalanceTransfer();

  const handleReceiptModalClose = () => {
    clearTxReceipt();
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter recipient's address"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Amount (AVAIL)</FormLabel>
              </div>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="string"
                    placeholder="Enter amount"
                    disabled={isSubmitting}
                    {...field}
                  />
                  {/* TODO: Implement max button logic */}
                  <Button variant="outline">Max</Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Switch
            checked={isKeepAlive}
            onCheckedChange={setIsKeepAlive}
            disabled={isSubmitting}
          />
          <Label>Keep account alive</Label>
        </div>

        {(isEstimatingFee || estimatedFee) && (
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="text-sm font-medium">Estimated Fees</div>
            <div className="mt-1 text-2xl font-bold">
              {isEstimatingFee ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Estimating...</span>
                </div>
              ) : (
                `${estimatedFee} AVAIL`
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Final fee may vary based on network conditions
            </div>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid || isEstimatingFee}
        >
          {isSubmitting
            ? "Transferring..."
            : isEstimatingFee
            ? "Estimating fees..."
            : "Transfer"}
        </Button>
      </div>

      <TransactionReceiptModal
        txReceipt={txReceipt}
        onClose={handleReceiptModalClose}
      />
    </Form>
  );
};

export default BalanceTransfer;
