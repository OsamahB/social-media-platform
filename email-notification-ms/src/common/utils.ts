export const sleep = (timeout: number) => {
  /**
   * This function is used in retry logic to wait for a certain amount of time before retrying.
   */
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};
