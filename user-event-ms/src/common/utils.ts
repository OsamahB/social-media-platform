export function filterBlankValues<T extends object>(obj: T): T {
  /**
    This function filters out null and undefined values from an object.
   */
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined), // eslint-disable-line @typescript-eslint/no-unused-vars
  ) as T;
}

export const sleep = (timeout: number) => {
  /**
   * This function is used in retry logic to wait for a certain amount of time before retrying.
   */
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};

export function formatDateString(date: Date): string {
  /**
   * This function formats a date object to a string in the format 'YYYY/MM/DD HH:MM'.
   */
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}
