import { ApiClient } from "@/api";
import { AuthService, createAuthService } from "./services/auth";
import { PollService, createPollService } from "./services/poll";
import { createApiPollRepo } from "./repos/poll";

export interface Application {
  auth: AuthService;
  poll: PollService;
}

export function createApplication(apiClient: ApiClient): Application {
  return {
    auth: createAuthService(),
    poll: createPollService(createApiPollRepo(apiClient)),
  };
}
