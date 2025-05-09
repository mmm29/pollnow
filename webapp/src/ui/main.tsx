import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { Application } from "@/domain";

export function renderApp(application: Application) {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
      <App application={application} />
    </StrictMode>
  );
}
