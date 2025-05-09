import { User } from "@/domain/models";

export interface AuthService {
  getMe: () => User | null;
}
