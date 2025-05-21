import { AuthService } from "./services/auth";
import { PollService } from "./services/poll";
import { SettingsService } from "./services/settings";

export interface Application {
  authService: AuthService;
  pollService: PollService;
  settingsService: SettingsService;
}
