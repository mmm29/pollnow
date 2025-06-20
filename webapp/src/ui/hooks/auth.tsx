import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  initialized: boolean;
  loggedIn: boolean;
  username: string;
  loginAction: (params: LoginParams) => Promise<Result<void, string>>;
  registerAction: (params: RegisterParams) => Promise<Result<void, string>>;
  logoutAction: () => Promise<void>;
};

const AuthContext: Context<AuthContextType | null> = createContext(null as any);

export function isInitialized() {
  const auth = useAuth();
  return auth.initialized;
}

export function useAuth(): AuthContextType {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("no auth context");
  }
  return auth;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { authService } = useApp();
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<string>();

  async function reinitializeUser(): Promise<Result<void, string>> {
    setUser(undefined);
    setInitialized(false);

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
    reinitializeUser();
  }

  useEffect(() => {
    reinitializeUser();
  }, []);

  const authContext: AuthContextType = {
    initialized,
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
