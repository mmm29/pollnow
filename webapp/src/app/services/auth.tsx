import { User } from "@/app/models";
import { err, ok, Result } from "neverthrow";

export interface AuthService {
  getMe(): Promise<User | null>;
  login(username: string, password: string): Promise<Result<void, string>>;
  register(username: string, password: string): Promise<Result<void, string>>;
  logout(): Promise<void>;
}

export function createAuthService(): AuthService {
  return {
    async getMe(): Promise<User | null> {
      return null;
      return {
        username: "user123",
      };
    },
    async login(
      username: string,
      password: string
    ): Promise<Result<void, string>> {
      return err("not implemented");
    },
    async register(username, password): Promise<Result<void, string>> {
      return err("not implemented");
    },
    async logout() {},
  };
}
