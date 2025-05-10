import { useParams } from "react-router-dom";

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

  return <ExtendedPoll title={title} description={description} />;
}
