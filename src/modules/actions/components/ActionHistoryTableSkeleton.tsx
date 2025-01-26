import ActionHistoryTableHeader from "./ActionHistoryTableHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/modules/common/components/ui/table";

const ActionHistoryTableSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200">
      <Table>
        <ActionHistoryTableHeader />
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index} className="animate-pulse">
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-32" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-20" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-28" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-24" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-24" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-16" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActionHistoryTableSkeleton;
