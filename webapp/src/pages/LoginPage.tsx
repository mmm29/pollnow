import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useAuth } from "../services/auth";
import { RedirectToHome } from "../router";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const auth = useAuth();

  if (auth.loggedIn) {
    return <RedirectToHome />;
  }

  // TODO: disactivate the submit button while the previous submit request is being processed
  // maybe also add progress bar or spinning icon

  async function handleSubmit() {
    // TODO: validate params

    await auth.loginAction({
      username: name,
      password,
    });

    setProcessing(false);
  }

  return (
    <>
      <div className="h-full w-full flex items-center justify-center mt-32">
        <div className="w-2/5 h-[70%] border px-32 py-32">
          <TextInput
            name="ads"
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
        </div>
      </div>
    </>
  );
}
