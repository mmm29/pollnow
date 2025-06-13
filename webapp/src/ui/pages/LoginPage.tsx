import { ReactNode, useState } from "react";
import { TextInput } from "../components/primitives/TextInput";
import { Button } from "../components/primitives/Button";
import { useAuth } from "../hooks/auth";
import { Link, Navigate } from "react-router-dom";
import { Container } from "../components/primitives/Container";
import { Field } from "../components/primitives/Field";
import { ErrorStatus } from "../components/primitives/Status";

export type LoginPageCoreProps = {
  title: string;
  children?: ReactNode;
};

function LoginPageContainer({ title, children }: LoginPageCoreProps) {
  const auth = useAuth();

  if (auth.loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container title={title} childSpace="md">
      {children}
    </Container>
  );
}

export function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();
  const auth = useAuth();

  // TODO: disactivate the submit button while the previous submit request is being processed
  // maybe also add progress bar or spinning icon

  async function handleSubmit() {
    // TODO: validate params

    setProcessing(true);

    const result = await auth.loginAction({
      username: name,
      password,
    });

    setProcessing(false);

    if (result.isErr()) {
      setError(result.error);
    }
  }

  return (
    <LoginPageContainer title="Login">
      <Field label="Name">
        <TextInput value={name} onChange={(name) => setName(name)} />
      </Field>
      <Field label="Password">
        <TextInput
          value={password}
          password
          onChange={(password) => setPassword(password)}
        />
      </Field>
      {processing && <p>Processing...</p>}
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>Login</Button>
      </div>
      <div className="flex justify-end mt-4">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
      <ErrorStatus error={error} />
    </LoginPageContainer>
  );
}

export function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();
  const auth = useAuth();

  // TODO: disactivate the submit button while the previous submit request is being processed
  // maybe also add progress bar or spinning icon

  async function handleSubmit() {
    // TODO: validate params

    setProcessing(true);

    const result = await auth.registerAction({
      username: name,
      password,
    });

    setProcessing(false);

    if (result.isErr()) {
      setError(result.error);
    }
  }

  return (
    <LoginPageContainer title="Register">
      <Field label="Name">
        <TextInput value={name} onChange={(name) => setName(name)} />
      </Field>
      <Field label="Password">
        <TextInput
          value={password}
          password
          onChange={(password) => setPassword(password)}
        />
      </Field>
      {processing && <p>Processing...</p>}
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>Register</Button>
      </div>
      <div className="flex justify-end mt-4">
        <Link to="/login">Already have an account? Login</Link>
      </div>
      <ErrorStatus error={error} />
    </LoginPageContainer>
  );
}
