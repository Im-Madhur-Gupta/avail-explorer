import { Button } from "@/modules/common/components/ui/button";
import { Input } from "@/modules/common/components/ui/input";
import { Label } from "@/modules/common/components/ui/label";
import { Switch } from "@/modules/common/components/ui/switch";

const BalanceTransfer = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input id="recipient" placeholder="Enter recipient's address" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="amount">Amount (AVAIL)</Label>
          <Button variant="ghost" size="sm" className="h-6">
            Max
          </Button>
        </div>
        <Input
          id="amount"
          type="number"
          placeholder="0.0"
          step="0.000000000001"
          min="0"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="keep-alive" />
        <Label htmlFor="keep-alive">Keep account alive</Label>
      </div>

      <Button className="w-full">Transfer</Button>
    </div>
  );
};

export default BalanceTransfer;
