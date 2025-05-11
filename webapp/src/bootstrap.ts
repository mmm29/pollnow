import { Application } from "./app";
import { ApiClient } from "./infrastructure/api";
import { createAuthService } from "./app/services/auth";
import { createPollService } from "./app/services/poll";
import { AuthApiImpl } from "./infrastructure/api/auth";
import { ApiPollRepository } from "./infrastructure/repos/poll";

const API_ENDPOINT = "http://localhost:8114";

export function createApplication(): Application {
  const apiClient = new ApiClient(API_ENDPOINT);

  return {
    auth: createAuthService(new AuthApiImpl(apiClient)),
    poll: createPollService(new ApiPollRepository(apiClient)),
  };
}
