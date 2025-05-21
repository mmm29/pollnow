import { AuthToken } from "@/app/services/auth";

export type UserCredentials = {
  username: string;
  password: string;
};

export type UserDto = {
  username: string;
};

export type AuthResponse = {
  token: AuthToken;
};
