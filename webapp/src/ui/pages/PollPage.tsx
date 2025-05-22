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
import { PollOptionId, PollStatistics } from "@/app/models/poll";
import clsx from "clsx";

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
        <div className="border border-gray-300 rounded-md p-4 flex flex-col space-y-4">
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
        </div>

        <div className="mt-4 flex justify-end">
          <Status status={status} />
          <Button variant="primary" type="submit">
            Complete
          </Button>
        </div>
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

  async function onUncomplete() {
    const result = await pollService.uncompletePoll(poll.id);
    if (result.isErr()) {
      // TODO: handle error
      return;
    }

    reload?.();
  }

  type OptionStats = {
    percentage: number;
    total: number;
  };

  function calculateStats(
    stats: PollStatistics
  ): Record<PollOptionId, OptionStats> {
    const totalCompletions = Object.values(stats.distribution).reduce(
      (total, val) => total + val,
      0
    );
    const targetTotal = 100;

    function mapValue(value: number): OptionStats {
      return {
        percentage: (value / totalCompletions) * targetTotal,
        total: value,
      };
    }

    return Object.fromEntries(
      Object.entries(stats.distribution).map(([key, value]) => [
        key,
        mapValue(value),
      ])
    );
  }

  const optionStats = poll.statistics ? calculateStats(poll.statistics) : {};

  return (
    <>
      <div className="border border-gray-300 rounded-md p-4 flex flex-col space-y-4">
        {poll.options.map((option) => (
          <>
            <div
              className={clsx(
                "flex items-center justify-between",
                option.selected ? "font-bold" : ""
              )}
            >
              <div>
                {option.text}
                {}
              </div>
              <div>
                {option.id in optionStats ? (
                  <>{optionStats[option.id].percentage.toFixed(1)} %</>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={onUncomplete}>
          Uncomplete
        </Button>
      </div>
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

      <div className="mt-4 flex justify-end">
        <Button variant="soft" onClick={onDelete}>
          Delete poll
        </Button>
      </div>
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
      <div className="mt-4">
        {poll.completed ? (
          <CompletedPoll poll={poll} reload={reload} />
        ) : (
          <UncompletedPoll poll={poll} reload={reload} />
        )}
        {poll.canEdit && <PollEdit poll={poll} />}
      </div>
    </>
  );
}

export function PollPage() {
  return (
    <Container title="Poll" childSpace="lg">
      <PageContent />
    </Container>
  );
}
