import { Container } from "../components/primitives/Container";
import { PollCard } from "../components/primitives/PollCard";
import { useNavigate } from "react-router-dom";
import { useApp } from "../hooks/app";
import { Poll } from "@/app/models";
import { useEffect, useState } from "react";

type PollId = string;

type PollGridProps = {
  cards: Poll[];
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
  const { pollService } = useApp();
  const navigate = useNavigate();

  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    pollService.getAllPolls().then((result) => {
      if (result.isErr()) {
        // TODO: handle error
        return;
      }

      setPolls(result.value);
    });
  }, []);

  function selectPoll(pollId: PollId) {
    navigate("/poll/" + pollId);
  }

  return <PollGrid cards={polls} onSelect={(pollId) => selectPoll(pollId)} />;
}

export function DashboardPage() {
  return (
    <Container title="Dashboard">
      <Dashboard />
    </Container>
  );
}
