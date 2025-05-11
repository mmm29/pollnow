import { User } from "@/app/models";
import { Result } from "neverthrow";

export interface AuthApi {
  getMe(): Promise<User | null>;
  login(username: string, password: string): Promise<Result<void, string>>;
  register(username: string, password: string): Promise<Result<void, string>>;
  logout(): Promise<void>;
}

export interface AuthService {
  getMe(): Promise<User | null>;
  login(username: string, password: string): Promise<Result<void, string>>;
  register(username: string, password: string): Promise<Result<void, string>>;
  logout(): Promise<void>;
}

export function createAuthService(authApi: AuthApi): AuthService {
  return {
    async getMe(): Promise<User | null> {
      return await authApi.getMe();
    },
    async login(
      username: string,
      password: string
    ): Promise<Result<void, string>> {
      return await authApi.login(username, password);
    },
    async register(username, password): Promise<Result<void, string>> {
      return await authApi.register(username, password);
    },
    async logout() {
      return await authApi.logout();
    },
  };
}
