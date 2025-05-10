import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../components/primitives/Button";
import { Container } from "../components/Container";
import { TextInput } from "../components/primitives/TextInput";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useApp } from "../hooks/app";

function FormBlock({ children }: { children: ReactNode }) {
  return <div className="border-b border-gray-900/10 pb-12">{children}</div>;
}

export function NewPollPage() {
  const app = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const pollDto = {
      title,
      description,
    };
    const createPollResult = await app.poll.createPoll(pollDto);
    // TODO: implement
  }

  return (
    <Container title="New poll">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="">
            <FormBlock>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <TextInput
                    name="Title"
                    description="Give the poll a title"
                    value={title}
                    onChange={(val) => setTitle(val)}
                  />
                </div>

                <div className="sm:col-span-full">
                  <TextInput
                    name="Description"
                    description="What this poll is about?"
                    textarea
                    value={description}
                    onChange={(val) => setDescription(val)}
                  />
                </div>
              </div>
            </FormBlock>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="submit">
              <PlusIcon className="size-5" />
              Create
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
