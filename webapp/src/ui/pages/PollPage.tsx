import { useParams } from "react-router-dom";
import { Container } from "../components/Container";

type ExtendedPollProps = {
  title: string;
  description?: string;
};

function ExtendedPoll({ title, description }: ExtendedPollProps) {
  return (
    <>
      <p>{title}</p>
      {description && <p>{description}</p>}
    </>
  );
}

export function PollPage() {
  const { pollId } = useParams();

  const title = "Poll title: " + pollId;
  const description = "Poll desc";

  return (
    <Container title="Poll">
      <ExtendedPoll title={title} description={description} />
    </Container>
  );
}
