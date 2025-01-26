import { InfiniteData } from "@tanstack/react-query";
import { ActionsResponse } from "../interfaces/action.interface";
import EmptyActionHistory from "./EmptyActionHistory";
import ActionHistoryTableHeader from "./ActionHistoryTableHeader";
import ActionHistoryTableRow from "./ActionHistoryTableRow";
import { Table, TableBody } from "@/modules/common/components/ui/table";

export interface ActionHistoryTableProps {
  data: InfiniteData<ActionsResponse, unknown> | undefined;
}

const ActionHistoryTable = ({ data }: ActionHistoryTableProps) => {
  if (!data || data.pages[0].extrinsics.edges.length === 0) {
    return <EmptyActionHistory />;
  }

  return (
    <div className="rounded-lg border border-gray-200">
      <Table>
        <ActionHistoryTableHeader />
        <TableBody>
          {data?.pages.map((page) =>
            page.extrinsics.edges.map(({ node }) => (
              <ActionHistoryTableRow key={node.id} action={node} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActionHistoryTable;
