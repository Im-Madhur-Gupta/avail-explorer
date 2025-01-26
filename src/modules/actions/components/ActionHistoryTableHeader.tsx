import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/ui/table";

const ActionHistoryTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 border-b border-gray-200">
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Time
        </TableHead>
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Block
        </TableHead>
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Hash
        </TableHead>
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Module
        </TableHead>
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Call
        </TableHead>
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </TableHead>
        <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fee
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ActionHistoryTableHeader;
