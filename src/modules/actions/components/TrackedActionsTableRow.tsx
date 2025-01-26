import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { TableRow, TableCell } from "@/modules/common/components/ui/table";
import { Badge } from "@/modules/common/components/ui/badge";
import { Button } from "@/modules/common/components/ui/button";
import ExternalLinkComponent from "@/modules/common/components/ExternalLink";
import { getTxHashExplorerLink } from "@/modules/common/utils/link.utils";
import { TrackedAction } from "../interfaces/action-tracking.interface";
import { actionStatusStyles } from "../constants/action.constants";

interface TrackedActionsTableRowProps {
  trackedAction: TrackedAction;
}

const TrackedActionsTableRow = ({
  trackedAction,
}: TrackedActionsTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium capitalize">
        {trackedAction.type}
      </TableCell>
      <TableCell className="max-w-[200px]">
        <ExternalLinkComponent href={getTxHashExplorerLink(trackedAction.hash)}>
          {`${trackedAction.hash.slice(0, 8)}...${trackedAction.hash.slice(
            -8
          )}`}
        </ExternalLinkComponent>
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={actionStatusStyles[trackedAction.status]}
        >
          {trackedAction.status}
        </Badge>
      </TableCell>
      <TableCell>
        {formatDistanceToNow(trackedAction.timestamp, { addSuffix: true })}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-transparent p-0"
        >
          <Link href={`/action/${trackedAction.hash}`}>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TrackedActionsTableRow;
