import { Application } from "@/app";
import { ApiClient } from "@/infrastructure/api";
import { createAuthService } from "@/app/services/auth";
import { createPollService } from "@/app/services/poll";
import { AuthApiImpl } from "@/infrastructure/api/auth";
import { ApiPollRepository } from "@/infrastructure/repos/poll";
import { TokenLocalStorage } from "@/infrastructure/tokenStorage";

const API_ENDPOINT = "http://localhost:8000";

export function createProdApplication(): Application {
  const tokenStorage = new TokenLocalStorage();
  const apiClient = new ApiClient(API_ENDPOINT, tokenStorage);

  return {
    authService: createAuthService(new AuthApiImpl(apiClient), tokenStorage),
    pollService: createPollService(new ApiPollRepository(apiClient)),
  };
}
