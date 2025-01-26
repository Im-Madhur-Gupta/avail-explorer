export interface ActionReceipt {
  txHash: string;
  blockId: string;
  status?: "success" | "error";
  errorMessage?: string;
}

