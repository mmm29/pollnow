import { User } from "@/app/models";
import { err, ok, Result } from "neverthrow";
import { AppError } from "../error";

export type AuthToken = string;

export interface AuthApi {
  getMe(): Promise<Result<User | null, AppError>>;
  login(
    username: string,
    password: string
  ): Promise<Result<AuthToken, AppError>>;
  register(
    username: string,
    password: string
  ): Promise<Result<AuthToken, AppError>>;
  logout(): Promise<void>;
}

export interface AuthService {
  getMe(): Promise<Result<User | null, AppError>>;
  login(username: string, password: string): Promise<Result<void, AppError>>;
  register(username: string, password: string): Promise<Result<void, AppError>>;
  logout(): Promise<void>;
}

export interface TokenStorage {
  setToken(token: AuthToken): Promise<void>;
  deleteToken(): Promise<void>;
}

class AuthServiceImpl implements AuthService {
  authApi: AuthApi;
  tokenStorage: TokenStorage;

  constructor(authApi: AuthApi, tokenStorage: TokenStorage) {
    this.authApi = authApi;
    this.tokenStorage = tokenStorage;
  }

  async getMe(): Promise<Result<User | null, string>> {
    const result = await this.authApi.getMe();
    if (result.isErr()) {
      return result;
    }

    const me = result.value;
    if (me == null) {
      await this._deleteToken();
    }

    return ok(me);
  }

  async login(
    username: string,
    password: string
  ): Promise<Result<void, string>> {
    const result = await this.authApi.login(username, password);
    if (result.isErr()) {
      return err(result.error);
    }

    await this.tokenStorage.setToken(result.value);
    return ok();
  }

  async register(
    username: string,
    password: string
  ): Promise<Result<void, string>> {
    const result = await this.authApi.register(username, password);
    if (result.isErr()) {
      return err(result.error);
    }

    await this.tokenStorage.setToken(result.value);
    return ok();
  }

  async logout() {
    await this.authApi.logout();
    await this._deleteToken();
  }

  async _deleteToken() {
    await this.tokenStorage.deleteToken();
  }
}

export function createAuthService(
  authApi: AuthApi,
  tokenStorage: TokenStorage
): AuthService {
  return new AuthServiceImpl(authApi, tokenStorage);
}
