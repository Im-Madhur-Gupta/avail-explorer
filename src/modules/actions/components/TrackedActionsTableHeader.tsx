import { TableHeader, TableRow } from "@/modules/common/components/ui/table";

import { TableHead } from "@/modules/common/components/ui/table";

const TrackedActionsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Type</TableHead>
        <TableHead>Hash</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Time</TableHead>
        <TableHead className="text-right">View Details</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TrackedActionsTableHeader;
