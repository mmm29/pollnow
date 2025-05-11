import { useState } from "react";
import { TextInput } from "../components/primitives/TextInput";
import { Button } from "../components/primitives/Button";
import { useAuth } from "../hooks/auth";
import { Error } from "../error";
import { Navigate } from "react-router-dom";
import { Container } from "../components/primitives/Container";
import { Field } from "../components/primitives/Field";

export function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  if (auth.loggedIn) {
    return <Navigate to="/" />;
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
    <Container title="Login">
      <div className="h-full w-full flex items-center justify-center mt-8">
        <div className="w-2/5 h-[70%] border px-32 py-32 rounded-4xl border-gray-300 shadow-md">
          <Field label="Name">
            <TextInput value={name} onChange={(name) => setName(name)} />
          </Field>
          <Field label="Password">
            <TextInput
              value={password}
              onChange={(password) => setPassword(password)}
            />
          </Field>
          {processing && <p>Processing...</p>}
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Login</Button>
          </div>
          <Error value={error} />
        </div>
      </div>
    </Container>
  );
}
