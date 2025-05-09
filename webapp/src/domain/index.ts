import { AuthService, createAuthService } from "./services/auth";

export interface Application {
  auth: AuthService;
}

export function createApplication(): Application {
  return {
    auth: createAuthService(),
  };
}
