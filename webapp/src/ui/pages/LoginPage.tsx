import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/auth";
import { RedirectToHome } from "../router";
import { Error } from "../error";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  if (auth.loggedIn) {
    return <RedirectToHome />;
  }

  // TODO: disactivate the submit button while the previous submit request is being processed
  // maybe also add progress bar or spinning icon

  async function handleSubmit() {
    // TODO: validate params

    setProcessing(true);

    const loginResult = await auth.loginAction({
      username: name,
      password,
    });

    setProcessing(false);

    if (loginResult.isErr()) {
      setError(loginResult.error);
    }
  }

  return (
    <>
      <div className="h-full w-full flex items-center justify-center mt-32">
        <div className="w-2/5 h-[70%] border px-32 py-32">
          <TextInput
            name="Name"
            value={name}
            onChange={(name) => setName(name)}
          />
          <TextInput
            name="Password"
            value={password}
            onChange={(password) => setPassword(password)}
          />
          {processing && <p>Processing...</p>}
          <Button text="Login" onClick={handleSubmit} />
          <Error value={error} />
        </div>
      </div>
    </>
  );
}
