import { useParams } from "react-router-dom";
import { Container } from "../components/primitives/Container";
import { useApp } from "../hooks/app";
import { useEffect, useState } from "react";
import { Poll } from "@/app/models";

function ExtendedPoll({ poll }: { poll: Poll }) {
  const title = poll.title;
  const description = poll.description;

  return (
    <>
      <p>{title}</p>
      {description && <p>{description}</p>}
    </>
  );
}

function PageContent() {
  const { pollId } = useParams();
  const { pollService } = useApp();
  const [loaded, setLoaded] = useState(false);
  const [poll, setPoll] = useState<Poll>();

  useEffect(() => {
    if (!pollId) {
      setLoaded(true);
      return;
    }

    pollService.findPollById(pollId).then((result) => {
      if (result.isErr()) {
        // TODO: handle error
        setLoaded(true);
        return;
      }

      setPoll(result.value);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <p>Loading..</p>;
  }

  if (!poll) {
    return <p>Poll not found</p>;
  }

  return <ExtendedPoll poll={poll} />;
}

export function PollPage() {
  return (
    <Container title="Poll">
      <PageContent />
    </Container>
  );
}
