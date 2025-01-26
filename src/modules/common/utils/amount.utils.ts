/**
 * Formats an amount to a human-readable string with proper decimal places
 * @param amount The amount in smallest unit (bigint)
 * @param decimals The number of decimals for the token
 * @returns Formatted amount string with proper decimal places
 */
export const formatAmount = (
  balance: bigint | string,
  decimals: number = 18
): string => {
  const balanceBigInt = BigInt(balance.toString());
  const divisor = BigInt(10 ** decimals);

  const integerPart = balanceBigInt / divisor;
  const fractionalPart = balanceBigInt % divisor;

  // Convert fractional part to string and pad with leading zeros
  let fractionalStr = fractionalPart.toString().padStart(decimals, "0");

  // Remove trailing zeros
  fractionalStr = fractionalStr.replace(/0+$/, "");

  return `${integerPart}${fractionalStr ? `.${fractionalStr}` : ""}`;
};
