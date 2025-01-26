import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

import ExternalLink from "@/modules/common/components/ExternalLink";
import {
  getBlockExplorerLink,
  getTxHashExplorerLink,
} from "@/modules/common/utils/link.utils";
import type { Action } from "@/modules/actions/interfaces/action.interface";

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
    <tr onClick={handleRowClick} className="hover:bg-gray-50 cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDistanceToNow(new Date(timestamp + "Z"), {
          addSuffix: true,
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <ExternalLink href={getBlockExplorerLink(blockId)}>
          {blockId}
        </ExternalLink>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <ExternalLink href={getTxHashExplorerLink(txHash)}>
          {txHash.slice(0, 12)}...
        </ExternalLink>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {module}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {call}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {success ? "Success" : "Failed"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {`${feesRounded} AVAIL`}
      </td>
    </tr>
  );
};

export default ActionHistoryTableRow;
