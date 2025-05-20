import { Application } from "@/app";
import { ApiClient } from "@/infrastructure/api";
import { createAuthService } from "@/app/services/auth";
import { createPollService } from "@/app/services/poll";
import { AuthApiImpl } from "@/infrastructure/api/auth";
import { ApiPollRepository } from "@/infrastructure/repos/poll";

const API_ENDPOINT = "http://localhost:8000";

export function createProdApplication(): Application {
  const apiClient = new ApiClient(API_ENDPOINT);

  return {
    authService: createAuthService(new AuthApiImpl(apiClient)),
    pollService: createPollService(new ApiPollRepository(apiClient)),
  };
}
