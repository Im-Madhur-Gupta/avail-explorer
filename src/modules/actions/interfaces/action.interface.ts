export interface Action {
  id: string;
  blockId: string;
  txHash: string;
  module: string;
  call: string;
  success: boolean;
  isSigned: boolean;
  extrinsicIndex: number;
  hash: string;
  timestamp: string;
  signer: string;
  feesRounded: number;
  argsName: string[];
  argsValue: string[];
}

export interface ActionsResponse {
  extrinsics: {
    edges: {
      node: Action;
      cursor: string;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface ActionResponse {
  extrinsics: {
    edges: {
      node: Action;
    }[];
  };
}
