import { Context, createContext, ReactNode, useContext, useState } from "react";
import { err, ok, Result } from "neverthrow";
import { useApp } from "./app";

export type LoginParams = {
  username: string;
  password: string;
};

export type AuthContextType = {
  loggedIn: boolean;
  username: string;
  loginAction: (params: LoginParams) => Promise<Result<void, string>>;
};

const AuthContext: Context<AuthContextType | null> = createContext(null as any);

export function isInitialized() {
  return useContext(AuthContext) !== null;
}

export function useAuth(): AuthContextType {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("no auth context");
  }
  return auth;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const authService = useApp().authService;
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<string>();

  async function initializeUser() {
    const me = await authService.getMe();
    setInitialized(true);

    if (me == null) {
      return;
    }

    setUser(me.username);
  }

  async function loginAction(params: LoginParams) {
    // Login
    const loginResult = await authService.login(
      params.username,
      params.password
    );

    if (loginResult.isErr()) {
      return err(loginResult.error);
    }

    // Get me
    const me = await authService.getMe();
    if (me == null) {
      return err("logged in, but no user");
    }

    setUser(me.username);
    return ok();
  }

  initializeUser();

  if (!initialized) {
    return <>{children}</>;
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
