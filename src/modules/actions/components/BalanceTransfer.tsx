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
import ActionFeeEstimate from "./ActionFeeEstimate";

const BalanceTransfer = () => {
  const {
    form,
    isSubmitting,
    isValid,
    isKeepAlive,
    estimatedFee,
    isEstimatingFee,
    handleSubmit,
    setIsKeepAlive,
  } = useBalanceTransfer();

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
                  {/* <Button variant="outline">Max</Button> */}
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

        <ActionFeeEstimate
          isEstimatingFee={isEstimatingFee}
          estimatedFee={estimatedFee}
        />

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid || isEstimatingFee}
        >
          {isSubmitting ? "Transferring..." : "Transfer"}
        </Button>
      </div>
    </Form>
  );
};

export default BalanceTransfer;
