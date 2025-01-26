/**
 * Validates and returns a non-null parameter
 * @param param - Parameter to validate
 * @returns The validated non-null parameter
 * @throws Error if parameter is null
 */
export const getValidatedParam = <T>(param: T | null): T => {
  if (!param) {
    throw new Error("Param not initialized");
  }
  return param;
};
