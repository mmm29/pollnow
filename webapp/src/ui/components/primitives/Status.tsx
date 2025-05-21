export type StatusType = {
  kind: StatusKind;
  text: string;
};

export type StatusKind = "error" | "success";

export type StatusProps = {
  status?: StatusType;
};

export function makeErrorStatus(error: string): StatusType {
  return {
    kind: "error",
    text: error,
  };
}

export function makeSuccessStatus(success: string): StatusType {
  return {
    kind: "success",
    text: success,
  };
}

type StatusVariation = {
  text: string;
  styles: string;
};

const variations: Record<StatusKind, StatusVariation> = {
  error: {
    text: "Error",
    styles: "",
  },
  success: {
    text: "Success",
    styles: "",
  },
};

export function Status({ status }: StatusProps) {
  // TODO: make nicer

  if (!status) {
    return <></>;
  }

  const variation = variations[status.kind];

  return (
    <>
      <p className={variation.styles}>
        {variation.text}: {status.text}
      </p>
    </>
  );
}

export type ErrorStatusProps = {
  error?: string;
};

export function ErrorStatus({ error }: ErrorStatusProps) {
  const status: StatusType | undefined = error
    ? {
        kind: "error",
        text: error,
      }
    : undefined;

  return <Status status={status} />;
}
