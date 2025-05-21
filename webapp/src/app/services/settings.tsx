import { Result } from "neverthrow";

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface SettingsService {
  changePassword(request: ChangePasswordRequest): Promise<Result<void, string>>;
}
