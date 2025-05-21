import { Context, createContext, ReactNode, useContext, useState } from "react";
import { err, ok, Result } from "neverthrow";
import { useApp } from "./app";

export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
};

export type AuthContextType = {
  loggedIn: boolean;
  username: string;
  loginAction: (params: LoginParams) => Promise<Result<void, string>>;
  registerAction: (params: RegisterParams) => Promise<Result<void, string>>;
  logoutAction: () => Promise<Result<void, string>>;
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

  async function reinitializeUser(): Promise<Result<void, string>> {
    const result = await authService.getMe();

    setInitialized(true);

    if (result.isErr()) {
      return err(result.error);
    }

    const me = result.value;
    if (me == null) {
      return ok();
    }

    setUser(me.username);
    return ok();
  }

  async function loginAction(params: LoginParams) {
    const loginResult = await authService.login(
      params.username,
      params.password
    );

    if (loginResult.isErr()) {
      return err(loginResult.error);
    }

    return await reinitializeUser();
  }

  async function registerAction(params: RegisterParams) {
    const registerResult = await authService.register(
      params.username,
      params.password
    );

    if (registerResult.isErr()) {
      return err(registerResult.error);
    }

    return await reinitializeUser();
  }

  async function logoutAction() {
    await authService.logout();
    return await reinitializeUser();
  }

  reinitializeUser();

  if (!initialized) {
    return <>{children}</>;
  }

  const authContext: AuthContextType = {
    loggedIn: user != null,
    username: user ? user : "",
    loginAction,
    registerAction,
    logoutAction,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
