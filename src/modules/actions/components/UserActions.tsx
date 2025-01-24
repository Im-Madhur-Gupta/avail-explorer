import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/ui/table";
import { Badge } from "@/modules/common/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

const UserActions = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actions: any[] = []; // TODO: Replace with actual actions data

  if (actions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-lg font-medium">No actions yet</div>
        <div className="text-sm text-muted-foreground">
          Your recent transactions will appear here
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Hash</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => (
            <TableRow key={action.hash}>
              <TableCell>
                <Badge
                  variant={action.type === "transfer" ? "default" : "secondary"}
                >
                  {action.type}
                </Badge>
              </TableCell>
              <TableCell className="font-mono">
                {action.hash.slice(0, 8)}...{action.hash.slice(-6)}
              </TableCell>
              <TableCell>
                {action.success ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Success
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="mr-1 h-4 w-4" />
                    Failed
                  </div>
                )}
              </TableCell>
              <TableCell>
                {new Date(action.timestamp).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">{action.fee} AVAIL</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserActions;
