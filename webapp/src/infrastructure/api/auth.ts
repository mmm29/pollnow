import { User } from "@/app/models";
import { AuthApi, AuthToken } from "@/app/services/auth";
import { err, ok, Result } from "neverthrow";
import { ApiClient } from ".";

export class AuthApiImpl implements AuthApi {
  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getMe(): Promise<Result<User | null, string>> {
    const result = await this.apiClient.getMe();

    if (!result.ok) {
      return err(result.error_message);
    }

    return ok(result.data);
  }

  async login(
    username: string,
    password: string
  ): Promise<Result<AuthToken, string>> {
    const result = await this.apiClient.login({
      username,
      password,
    });
    if (!result.ok) {
      return err(result.error_message);
    }
    
    return ok(result.data);
  }

  async register(
    username: string,
    password: string
  ): Promise<Result<AuthToken, string>> {
    const result = await this.apiClient.createUser({
      username,
      password,
    });
    if (!result.ok) {
      return err(result.error_message);
    }

    return ok(result.data);
  }

  async logout(): Promise<void> {
    await this.apiClient.logout();
  }
}
