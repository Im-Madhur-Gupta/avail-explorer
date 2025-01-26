import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/ui/dialog";
import {
  getBlockExplorerLink,
  getTxHashExplorerLink,
} from "@/modules/common/utils/link.utils";
import ExternalLink from "@/modules/common/components/ExternalLink";
import type { ActionReceipt } from "../interfaces/action-receipt.interface";

interface ActionReceiptModalProps {
  actionReceipt: ActionReceipt | null;
  onClose: () => void;
}

const ActionReceiptModal = ({
  actionReceipt,
  onClose,
}: ActionReceiptModalProps) => {
  if (!actionReceipt) {
    return null;
  }

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Action Complete</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Hash</div>
            <ExternalLink href={getTxHashExplorerLink(actionReceipt.txHash)}>
              {actionReceipt.txHash.slice(0, 24)}...
            </ExternalLink>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Block</div>
            <ExternalLink href={getBlockExplorerLink(actionReceipt.blockId)}>
              {actionReceipt.blockId.slice(0, 24)}...
            </ExternalLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionReceiptModal;
