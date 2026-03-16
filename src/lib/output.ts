export function formatOutput(data: unknown, pretty: boolean): string {
  if (pretty) {
    return JSON.stringify(data, null, 2);
  }
  return JSON.stringify(data);
}
