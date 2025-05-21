import { Result } from "neverthrow";
import { AppError } from "../error";

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface SettingsService {
  changePassword(
    request: ChangePasswordRequest
  ): Promise<Result<void, AppError>>;
}
