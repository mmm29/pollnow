import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { Container } from "../components/primitives/Container";
import { useApp } from "../hooks/app";
import { FormEvent, useEffect, useState } from "react";
import { Poll } from "@/app/models";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Button } from "../components/primitives/Button";
import {
  makeErrorStatus,
  Status,
  StatusType,
} from "../components/primitives/Status";

type UncompletedPollProps = {
  poll: Poll;
  reload?: VoidFunction;
};

function UncompletedPoll({ poll, reload }: UncompletedPollProps) {
  const { pollService } = useApp();
  const [selection, setSelection] = useState<string>();
  const [status, setStatus] = useState<StatusType>();

  async function onComplete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus(undefined);

    if (!selection) {
      setStatus(makeErrorStatus("Please, select exactly one option"));
      return;
    }

    const result = await pollService.completePoll(poll.id, {
      option_id: selection,
    });

    if (result.isErr()) {
      setStatus(makeErrorStatus(result.error));
      return;
    }

    reload?.();
  }

  return (
    <>
      <form onSubmit={onComplete}>
        <RadioGroup value={selection} onChange={setSelection}>
          {poll.options.map((option) => (
            <Field key={option.id} className="flex items-center gap-2">
              <Radio
                value={option.id}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
              </Radio>
              <Label>{option.text}</Label>
            </Field>
          ))}
        </RadioGroup>

        <Status status={status} />
        <Button variant="primary" type="submit">
          Complete
        </Button>
      </form>
    </>
  );
}

type CompletedPollProps = {
  poll: Poll;
  reload?: VoidFunction;
};

function CompletedPoll({ poll, reload }: CompletedPollProps) {
  const { pollService } = useApp();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await pollService.uncompletePoll(poll.id);
    if (result.isErr()) {
      // TODO: handle error
      return;
    }

    reload?.();
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        {poll.options.map((option) => (
          <>
            <p className={option.selected ? "font-bold" : ""}>{option.text}</p>
          </>
        ))}

        <Button variant="primary" type="submit">
          Uncomplete
        </Button>
      </form>
    </>
  );
}

function PollEdit({ poll }: { poll: Poll }) {
  const { pollService } = useApp();
  const navigate = useNavigate();
  const [status, setStatus] = useState<StatusType>();

  async function onDelete() {
    setStatus(undefined);

    const result = await pollService.deletePoll(poll.id);
    if (result.isErr()) {
      setStatus(makeErrorStatus(result.error));
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div>
      <Status status={status} />

      <Button variant="soft" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}

function PageContent() {
  const { pollId } = useParams();
  const { pollService } = useApp();
  const [loaded, setLoaded] = useState(false);
  const [poll, setPoll] = useState<Poll>();

  async function reload() {
    setLoaded(false);
    setPoll(undefined);

    if (!pollId) {
      setLoaded(true);
      return;
    }

    const result = await pollService.findPollById(pollId);
    if (result.isErr()) {
      // TODO: handle error
      setLoaded(true);
      return;
    }

    setPoll(result.value);
    setLoaded(true);
  }

  useEffect(() => {
    reload();
  }, []);

  if (!loaded) {
    return <p>Loading..</p>;
  }

  if (!poll) {
    return <p>Poll not found</p>;
  }

  const title = poll.title;
  const description = poll.description;

  return (
    <>
      <h1 className="text-gray-800 font-semibold text-2xl">{title}</h1>
      {description && <h2 className="text-gray-600 text-xl">{description}</h2>}
      {poll.completed ? (
        <CompletedPoll poll={poll} reload={reload} />
      ) : (
        <UncompletedPoll poll={poll} reload={reload} />
      )}
      {poll.canEdit && <PollEdit poll={poll} />}
    </>
  );
}

export function PollPage() {
  return (
    <Container title="Poll">
      <PageContent />
    </Container>
  );
}
