export interface Extrinsic {
  id: string;
  module: string;
  timestamp: string;
  txHash: string;
  argsName: string[];
  argsValue: string[];
  extrinsicIndex: number;
  hash: string;
  success: boolean;
  signature: string;
  signer: string;
  feesRounded: number;
}

export interface ExtrinsicEdge {
  node: Extrinsic;
  cursor: string;
}

export interface ExtrinsicsResponse {
  extrinsics: {
    edges: ExtrinsicEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}
