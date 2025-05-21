import { AuthToken, TokenStorage } from "@/app/services/auth";
import { AuthTokenProvider } from "./api";

const AuthTokenItemId = "authToken";

export class TokenLocalStorage implements TokenStorage, AuthTokenProvider {
  async getAuthToken(): Promise<AuthToken | null> {
    return localStorage.getItem(AuthTokenItemId);
  }

  async setToken(token: AuthToken): Promise<void> {
    localStorage.setItem(AuthTokenItemId, token);
  }

  async deleteToken(): Promise<void> {
    localStorage.removeItem(AuthTokenItemId);
  }
}
