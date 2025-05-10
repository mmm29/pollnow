import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

import { Application } from "@/app";

import { BRoutes } from "./router";
import { AuthProvider, isInitialized as isAuthInitialized } from "./hooks/auth";
import { ReactNode } from "react";
import { LoadingScreen } from "./pages/LoadingScreen";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./hooks/app";

function ContextProviders({
  application,
  children,
}: {
  application: Application;
  children: ReactNode;
}) {
  return (
    <AppProvider application={application}>
      <AuthProvider>{children}</AuthProvider>
    </AppProvider>
  );
}

function isAppReady() {
  return isAuthInitialized();
}

function UiApp() {
  if (!isAppReady()) {
    return <LoadingScreen />;
  }

  return <BRoutes />;
}

function Root({ application }: { application: Application }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <ContextProviders application={application}>
          <UiApp />
        </ContextProviders>
      </BrowserRouter>
    </StrictMode>
  );
}

export function renderUi(application: Application) {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <Root application={application} />
  );
}
