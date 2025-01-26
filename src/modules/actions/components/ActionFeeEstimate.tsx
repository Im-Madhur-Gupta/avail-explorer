import { Loader2 } from "lucide-react";

export interface ActionFeeEstimateProps {
  isEstimatingFee: boolean;
  estimatedFee: string | null;
}

const ActionFeeEstimate = ({
  isEstimatingFee,
  estimatedFee,
}: ActionFeeEstimateProps) => {
  const getActionFeeEstimateContent = () => {
    if (isEstimatingFee) {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Estimating...</span>
        </div>
      );
    }

    if (estimatedFee !== null) {
      return <div>{estimatedFee} AVAIL</div>;
    }

    return <div>-</div>;
  };

  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <div className="text-sm font-medium">Estimated Fees</div>
      <div className="mt-1 text-2xl font-bold">
        {getActionFeeEstimateContent()}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Final fee may vary based on network conditions
      </div>
    </div>
  );
};

export default ActionFeeEstimate;
