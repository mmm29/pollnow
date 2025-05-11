export type PollOptionDesc = {
  text: string;
};

export type PollDesc = {
  title: string;
  description: string;
  options: PollOptionDesc[];
};
