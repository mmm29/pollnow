export function stringifyError(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }

  try {
    return String(e);
  } catch {
    return "Unknown error";
  }
}

export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
