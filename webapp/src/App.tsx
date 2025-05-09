import { Router } from "./router";

import "./styles.css";
import { AuthContextProvider } from "./services/auth";

export function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </>
  );
}
