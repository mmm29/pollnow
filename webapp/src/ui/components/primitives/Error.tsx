export type ErrorProps = {
  error: string;
};

export function Error({ error }: ErrorProps) {
  // TODO: make nicer
  return (
    <>
      <div>
        <p>Error:</p>
        <p>{error}</p>
      </div>
    </>
  );
}
