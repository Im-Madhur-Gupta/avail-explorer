import {
  getBlockExplorerLink,
  getTxHashExplorerLink,
} from "@/modules/common/utils/link.utils";
import ExternalLink from "@/modules/common/components/ExternalLink";
import type { TransactionReceipt } from "../interfaces/transaction-receipt.interface";

interface TransactionReceiptProps {
  txReceipt: TransactionReceipt;
}

const TransactionReceipt = ({ txReceipt }: TransactionReceiptProps) => {
  return (
    <div className="rounded-lg border bg-muted p-4 space-y-2">
      <div className="space-y-1">
        <div className="text-sm font-medium">Transaction Hash</div>

        <ExternalLink href={getTxHashExplorerLink(txReceipt.txHash)}>
          {txReceipt.txHash.slice(0, 24)}...
        </ExternalLink>
      </div>

      <div className="space-y-1">
        <div className="text-sm font-medium">Block</div>
        <ExternalLink href={getBlockExplorerLink(txReceipt.blockId)}>
          {txReceipt.blockId}
        </ExternalLink>
      </div>
    </div>
  );
};

export default TransactionReceipt;
