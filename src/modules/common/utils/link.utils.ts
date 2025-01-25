export const getTxHashExplorerLink = (txHash: string) => {
  return `https://avail-turing.subscan.io/extrinsic/${txHash}`;
};

export const getBlockExplorerLink = (blockId: string) => {
  return `https://avail-turing.subscan.io/block/${blockId}`;
};
