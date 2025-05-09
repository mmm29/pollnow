import { AuthService } from "./services/auth";

export type { AuthService };

export interface Application {
  auth: AuthService;
}
