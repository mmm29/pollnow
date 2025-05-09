import { Router } from "./router";

import "./styles.css";

import { AuthContextProvider } from "./hooks/auth";
import { Application } from "@/domain";
import { ReactNode } from "react";

function ContextProviders({
  application,
  children,
}: {
  application: Application;
  children: ReactNode;
}) {
  return (
    <AuthContextProvider authService={application.auth}>
      {children}
    </AuthContextProvider>
  );
}

export function App({ application }: { application: Application }) {
  return (
    <>
      <ContextProviders application={application}>
        <Router />
      </ContextProviders>
    </>
  );
}
