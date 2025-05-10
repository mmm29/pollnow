import { Application } from "@/app";
import { createContext, ReactNode, useContext } from "react";

const AppContext = createContext<Application | null>(null);

export function useApp(): Application {
  const app = useContext(AppContext);
  if (app === null) {
    throw new Error("app was not provided");
  }
  return app;
}

export function AppProvider({
  application,
  children,
}: {
  application: Application;
  children: ReactNode;
}) {
  return (
    <AppContext.Provider value={application}>{children}</AppContext.Provider>
  );
}
