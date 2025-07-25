import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../components/primitives/Button";
import { Container } from "../components/primitives/Container";
import { TextInput } from "../components/primitives/TextInput";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useApp } from "../hooks/app";
import { Field } from "../components/primitives/Field";
import {
  OptionsBuilder,
  PollOption,
} from "../components/primitives/OptionsBuilder";
import { PollDesc } from "@/app/dto";
import { PollOptionDesc } from "@/app/dto/poll";
import { useNavigate } from "react-router-dom";
import { Section } from "../components/primitives/Section";

export function NewPollPage() {
  const { pollService } = useApp();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<PollOption[]>([]);
  const defaultOption: PollOption = {
    text: "",
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const optionsDto: PollOptionDesc[] = options.map((option) => ({
      text: option.text,
    }));
    const pollDesc: PollDesc = {
      title,
      description,
      options: optionsDto,
    };
    const createPollResult = await pollService.createPoll(pollDesc);
    if (createPollResult.isErr()) {
      // TODO: handle error
      return;
    }

    const createdPollId = createPollResult.value;
    navigate("/poll/" + createdPollId);
  }

  function handleAddOption() {
    setOptions((prev) => [...prev, defaultOption]);
  }

  function handleDeleteOption(idx: number) {
    setOptions((prev) => prev.filter((_, i) => i != idx));
  }

  function handleUpdateOption(idx: number, value: string) {
    setOptions((prev) =>
      prev.map((prevValue, i) => (i == idx ? { text: value } : prevValue))
    );
  }

  return (
    <Container title="New poll" childSpace="lg">
      <form onSubmit={handleSubmit}>
        <Section>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <Field label="Title" description="Give the poll a title">
              <TextInput value={title} onChange={(val) => setTitle(val)} />
            </Field>

            <Field label="Description" description="What this poll is about?">
              <TextInput
                textarea
                value={description}
                onChange={(val) => setDescription(val)}
              />
            </Field>

            <Field label="Options">
              <OptionsBuilder
                options={options}
                onOptionAdd={handleAddOption}
                onDelete={handleDeleteOption}
                onUpdate={handleUpdateOption}
              />
            </Field>
          </div>
        </Section>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button type="submit">
            <PlusIcon className="size-5" />
            Create
          </Button>
        </div>
      </form>
    </Container>
  );
}
