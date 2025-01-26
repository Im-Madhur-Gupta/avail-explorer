export const getAddressExplorerLink = (address: string) => {
  return `https://avail-turing.subscan.io/account/${address}`;
};

export const getTxHashExplorerLink = (txHash: string) => {
  return `https://avail-turing.subscan.io/extrinsic/${txHash}`;
};

export const getBlockExplorerLink = (blockId: string) => {
  return `https://avail-turing.subscan.io/block/${blockId}`;
};
