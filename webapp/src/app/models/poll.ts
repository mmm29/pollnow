export type PollId = string;
export type PollOptionId = string;

export type PollOption = {
  id: PollOptionId;
  text: string;
};

export type Poll = {
  id: PollId;
  title: string;
  description: string | null;
  options: PollOption[];
};
