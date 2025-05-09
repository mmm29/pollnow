import { Router } from "./router";

import "./styles.css";
import { AuthContextProvider } from "./hooks/auth";

export function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </>
  );
}
