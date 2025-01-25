export const getValidatedParam = <T>(param: T | null): T => {
  if (!param) {
    throw new Error("Param not initialized");
  }
  return param;
};
