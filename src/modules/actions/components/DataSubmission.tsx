import { Button } from "@/modules/common/components/ui/button";
import { Input } from "@/modules/common/components/ui/input";
import { Label } from "@/modules/common/components/ui/label";
import { Textarea } from "@/modules/common/components/ui/textarea";

const DataSubmission = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="app-id">App ID</Label>
        <Input id="app-id" placeholder="Enter application ID" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="data">Data</Label>
        <Textarea
          id="data"
          placeholder="Enter data to submit"
          className="min-h-[100px]"
        />
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="text-sm font-medium">Estimated Fees</div>
        <div className="mt-1 text-2xl font-bold">0.0 AVAIL</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Final fee may vary based on network conditions
        </div>
      </div>

      <Button className="w-full">Submit Data</Button>
    </div>
  );
};

export default DataSubmission;
