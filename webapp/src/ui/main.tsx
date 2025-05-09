import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

import { Application } from "@/domain";

import { Router } from "./router";
import {
  AuthContextProvider,
  isInitialized as isAuthInitialized,
} from "./hooks/auth";
import { ReactNode } from "react";
import { LoadingScreen } from "./pages/LoadingScreen";

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

function UiApp() {
  const isAllInitialized = isAuthInitialized();
  if (!isAllInitialized) {
    return <LoadingScreen />;
  }

  return <Router />;
}

function Root({ application }: { application: Application }) {
  return (
    <StrictMode>
      <ContextProviders application={application}>
        <UiApp />
      </ContextProviders>
    </StrictMode>
  );
}

export function renderUi(application: Application) {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <Root application={application} />
  );
}
