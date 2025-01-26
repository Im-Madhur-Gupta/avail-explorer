import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

import ExternalLink from "@/modules/common/components/ExternalLink";
import {
  getBlockExplorerLink,
  getTxHashExplorerLink,
} from "@/modules/common/utils/link.utils";
import type { Action } from "@/modules/actions/interfaces/action.interface";
import { TableCell, TableRow } from "@/modules/common/components/ui/table";

interface ActionHistoryTableRowProps {
  action: Action;
}

const ActionHistoryTableRow = ({ action }: ActionHistoryTableRowProps) => {
  const { blockId, txHash, module, call, success, feesRounded, timestamp } =
    action;

  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/action/${txHash}`);
  };

  return (
    <TableRow onClick={handleRowClick} className="cursor-pointer">
      <TableCell className="text-sm text-gray-500">
        {formatDistanceToNow(new Date(timestamp + "Z"), {
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="text-sm text-gray-500">
        <ExternalLink href={getBlockExplorerLink(blockId)}>
          {blockId}
        </ExternalLink>
      </TableCell>
      <TableCell className="text-sm text-gray-500">
        <ExternalLink href={getTxHashExplorerLink(txHash)}>
          {txHash.slice(0, 12)}...
        </ExternalLink>
      </TableCell>
      <TableCell className="text-sm font-medium text-gray-900">
        {module}
      </TableCell>
      <TableCell className="text-sm font-medium text-gray-900">
        {call}
      </TableCell>
      <TableCell>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {success ? "Success" : "Failed"}
        </span>
      </TableCell>
      <TableCell className="text-sm text-gray-500">
        {`${feesRounded} AVAIL`}
      </TableCell>
    </TableRow>
  );
};

export default ActionHistoryTableRow;
