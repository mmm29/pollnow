/**
 * Formats error for display in UI.
 * Should return null only in exceptional cases.
 *
 * @param error error to be formatted
 * @returns formatted error message, or null if no error message should be displayed
 */
export function formatError(error: unknown): string | null {
  // TODO: implement
  return null;
}

export function Error({ value }: { value: unknown }) {
  if (value === null || value === undefined) {
    return;
  }

  const text = typeof value == "string" ? value : String(value);

  return (
    <>
      <p className="text-red-500">{text}</p>
    </>
  );
}
