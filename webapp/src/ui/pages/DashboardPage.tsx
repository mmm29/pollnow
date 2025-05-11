import { Container } from "../components/primitives/Container";
import { PollCard } from "../components/primitives/PollCard";
import { useNavigate } from "react-router-dom";

type PollId = string;

type PollGridCard = {
  id: PollId;
  title: string;
  description?: string;
};

type PollGridProps = {
  cards: PollGridCard[];
  onSelect?: (pollId: PollId) => void;
};

function PollGrid({ cards, onSelect }: PollGridProps) {
  function handleClick(pollId: PollId) {
    if (onSelect) {
      onSelect(pollId);
    }
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {cards.map((card) => (
          <PollCard
            key={card.id}
            title={card.title}
            description={card.description}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>
    </>
  );
}

function Dashboard() {
  // TODO: replace
  const numPollCards = 10;
  const pollCards = Array.from({ length: numPollCards }, (_, i) => {
    let v = {
      id: String(i),
      title: "Poll " + i,
      description: "Poll description " + i,
    };
    return v;
  });

  const navigate = useNavigate();

  function selectPoll(pollId: PollId) {
    navigate("/poll/" + pollId);
  }

  return (
    <PollGrid cards={pollCards} onSelect={(pollId) => selectPoll(pollId)} />
  );
}

export function DashboardPage() {
  return (
    <Container title="Dashboard">
      <Dashboard />
    </Container>
  );
}
