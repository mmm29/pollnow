import { Context, createContext, ReactNode, useContext, useState } from "react";
import { AuthService } from "@/domain";

export type LoginParams = {
  username: string;
  password: string;
};

export type AuthContextType = {
  loggedIn: boolean;
  username: string;
  loginAction: (params: LoginParams) => Promise<void>;
};

const AuthContext: Context<AuthContextType | null> = createContext(null as any);

export function useAuth(): AuthContextType {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("no auth context");
  }
  return auth;
}

export function AuthContextProvider({
  authService,
  children,
}: {
  authService: AuthService;
  children: ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);

  async function loginAction(params: LoginParams) {
    const response = await apiClient.login(params.username, params.password);
    if (!response.ok) {
      // TODO: handle errors
      return;
    }

    const responseUser = response.data;
    if (!responseUser) {
      throw new Error("no user");
    }

    setUser(responseUser.username);
  }

  const authContext: AuthContextType = {
    loggedIn: user != null,
    username: user ? user : "",
    loginAction,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
