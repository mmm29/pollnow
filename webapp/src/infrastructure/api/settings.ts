import {
  ChangePasswordRequest,
  SettingsService,
} from "@/app/services/settings";
import { err, ok, Result } from "neverthrow";
import { ApiClient } from ".";

export class SettingsApi implements SettingsService {
  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async changePassword(
    request: ChangePasswordRequest
  ): Promise<Result<void, string>> {
    if (request.newPassword !== request.confirmPassword) {
      return err("Passwords do not match");
    }

    const result = await this.apiClient.changePassword({
      old_password: request.oldPassword,
      new_password: request.newPassword,
    });

    if (!result.ok) {
      return err(result.error_message);
    }

    return ok();
  }
}
