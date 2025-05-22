export type PollId = string;
export type PollOptionId = string;

export type PollCompletion = {
  option_id: PollOptionId;
};

export type PollStatistics = {
  distribution: Record<string, number>;
};

export type PollOption = {
  id: PollOptionId;
  text: string;
  selected: boolean;
};

export type Poll = {
  id: PollId;
  title: string;
  completed: boolean;
  canEdit: boolean;
  description: string | null;
  options: PollOption[];
  statistics: PollStatistics | null;
};
