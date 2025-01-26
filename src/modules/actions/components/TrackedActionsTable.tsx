import { Table, TableBody } from "@/modules/common/components/ui/table";
import TrackedActionsTableRow from "./TrackedActionsTableRow";
import { useAppStore } from "@/modules/common/providers/StoreProvider";
import TrackedActionsTableHeader from "./TrackedActionsTableHeader";

const TrackedActionsTable = () => {
  const trackedActions = useAppStore((state) => state.trackedActions);

  const isTrackedActionsEmpty = Object.keys(trackedActions).length === 0;
  if (isTrackedActionsEmpty) {
    return null;
  }

  // Sort actions by timestamp, newest first
  const sortedTrackedActions = Object.values(trackedActions).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Actions</h2>
        <p className="text-sm text-muted-foreground">
          {sortedTrackedActions.length} actions
        </p>
      </div>

      <Table>
        <TrackedActionsTableHeader />
        <TableBody>
          {sortedTrackedActions.map((action) => (
            <TrackedActionsTableRow key={action.hash} trackedAction={action} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrackedActionsTable;
