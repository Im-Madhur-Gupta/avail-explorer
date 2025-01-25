import { InfiniteData } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { ExtrinsicsResponse } from "../interfaces/extrinsic.interface";
import EmptyActionHistory from "./EmptyActionHistory";
import ExternalLink from "@/modules/common/components/ExternalLink";
import {
  getBlockExplorerLink,
  getTxHashExplorerLink,
} from "@/modules/common/utils/link.utils";

export interface ActionHistoryTableProps {
  data: InfiniteData<ExtrinsicsResponse, unknown> | undefined;
}

const ActionHistoryTable = ({ data }: ActionHistoryTableProps) => {
  if (!data || data.pages[0].extrinsics.edges.length === 0) {
    return <EmptyActionHistory />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Block
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hash
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Module
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fee
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.pages.map((page) =>
            page.extrinsics.edges.map(({ node }) => {
              const blockId = node.id.split("-")[0];

              return (
                <tr key={node.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(node.timestamp + "Z"), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <ExternalLink href={getTxHashExplorerLink(node.txHash)}>
                      {node.id}
                    </ExternalLink>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <ExternalLink href={getBlockExplorerLink(blockId)}>
                      {blockId}
                    </ExternalLink>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <ExternalLink href={getTxHashExplorerLink(node.txHash)}>
                      {node.txHash.slice(0, 12)}...
                    </ExternalLink>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {node.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        node.success
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {node.success ? "Success" : "Failed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {node.feesRounded} AVL
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActionHistoryTable;
