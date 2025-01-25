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
import type { TransactionReceipt } from "../interfaces/transaction-receipt.interface";

interface TransactionReceiptModalProps {
  txReceipt: TransactionReceipt | null;
  onClose: () => void;
}

const TransactionReceiptModal = ({
  txReceipt,
  onClose,
}: TransactionReceiptModalProps) => {
  if (!txReceipt) {
    return null;
  }

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Transaction Complete</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Transaction Hash</div>
            <ExternalLink href={getTxHashExplorerLink(txReceipt.txHash)}>
              {txReceipt.txHash.slice(0, 24)}...
            </ExternalLink>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Block</div>
            <ExternalLink href={getBlockExplorerLink(txReceipt.blockId)}>
              {txReceipt.blockId.slice(0, 24)}...
            </ExternalLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionReceiptModal;
