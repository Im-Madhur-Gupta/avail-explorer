import { InfiniteData } from "@tanstack/react-query";
import { ActionsResponse } from "../interfaces/action.interface";
import EmptyActionHistory from "./EmptyActionHistory";
import ActionHistoryTableHeader from "./ActionHistoryTableHeader";
import ActionHistoryTableRow from "./ActionHistoryTableRow";

export interface ActionHistoryTableProps {
  data: InfiniteData<ActionsResponse, unknown> | undefined;
}

const ActionHistoryTable = ({ data }: ActionHistoryTableProps) => {
  if (!data || data.pages[0].extrinsics.edges.length === 0) {
    return <EmptyActionHistory />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <ActionHistoryTableHeader />
        <tbody className="divide-y divide-gray-200">
          {data?.pages.map((page) =>
            page.extrinsics.edges.map(({ node }) => (
              <ActionHistoryTableRow key={node.id} action={node} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActionHistoryTable;
