import { AuthService } from "./services/auth";
import { PollService } from "./services/poll";

export interface Application {
  authService: AuthService;
  pollService: PollService;
}
