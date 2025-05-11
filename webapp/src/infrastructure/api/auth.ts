import { User } from "@/app/models";
import { AuthApi } from "@/app/services/auth";
import { Result } from "neverthrow";
import { ApiClient } from ".";

export class AuthApiImpl implements AuthApi {
  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getMe(): Promise<User | null> {
    return null;
  }
  async login(
    username: string,
    password: string
  ): Promise<Result<void, string>> {
    throw new Error("Method not implemented.");
  }
  async register(
    username: string,
    password: string
  ): Promise<Result<void, string>> {
    throw new Error("Method not implemented.");
  }
  async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
