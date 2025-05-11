import { AuthService } from "./services/auth";
import { PollService } from "./services/poll";

export interface Application {
  auth: AuthService;
  poll: PollService;
}
