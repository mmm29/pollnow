export enum ErrorKind {
  NetworkError,
  ApiError,
}

export type NetworkError = {
  kind: ErrorKind.NetworkError;
};

export type ApiError = {
  kind: ErrorKind.ApiError;
};

export type AppError = NetworkError | ApiError;
