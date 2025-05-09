import { useAuth } from "../services/auth";
import { RedirectToLogin } from "../router";

export default function HomePage() {
  const auth = useAuth();

  if (!auth.loggedIn) {
    return <RedirectToLogin />;
  }

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
    </>
  );
}
