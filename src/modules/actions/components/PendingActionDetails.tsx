import { Loader2 } from "lucide-react";

import { Badge } from "@/modules/common/components/ui/badge";
import { getTxHashExplorerLink } from "@/modules/common/utils/link.utils";
import ExternalLink from "@/modules/common/components/ExternalLink";
import { actionStatusStyles } from "../constants/action.constants";
import { TrackedAction } from "../interfaces/action-tracking.interface";

interface PendingActionDetailsProps {
  action: TrackedAction;
}

const PendingActionDetails = ({ action }: PendingActionDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8 rounded-lg border bg-card">
        <div className="space-y-6 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Transaction Pending</h3>
            <p className="text-sm text-muted-foreground">
              Waiting for transaction to be finalized on the network
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Transaction Details</h3>
          <dl className="space-y-4">
            <div className="grid grid-cols-[25%_75%] gap-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Status
              </dt>
              <dd>
                <Badge
                  variant="secondary"
                  className={actionStatusStyles[action.status]}
                >
                  {action.status}
                </Badge>
              </dd>
            </div>
            <div className="grid grid-cols-[25%_75%] gap-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Hash
              </dt>
              <dd className="text-sm break-all">
                <ExternalLink href={getTxHashExplorerLink(action.hash)}>
                  {action.hash}
                </ExternalLink>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PendingActionDetails;
