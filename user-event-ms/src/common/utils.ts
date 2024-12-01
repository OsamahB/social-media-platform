export function filterBlankValues<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined), // eslint-disable-line @typescript-eslint/no-unused-vars
  ) as T;
}
