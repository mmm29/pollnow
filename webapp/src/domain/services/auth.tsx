import { User } from "@/domain/models";
import { err, Result } from "neverthrow";

export interface AuthService {
  getMe: () => Promise<User | null>;
  login: (username: string, password: string) => Promise<Result<void, string>>;
}

export function createAuthService(): AuthService {
  return {
    async getMe(): Promise<User | null> {
      return null;
    },
    async login(
      username: string,
      password: string
    ): Promise<Result<void, string>> {
      return err("not implemented");
    },
  };
}
