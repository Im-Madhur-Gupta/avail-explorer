export const hexToString = (hex: string): string => {
  // Remove '0x' if present
  hex = hex.replace("0x", "");

  // Convert hex to string
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};
