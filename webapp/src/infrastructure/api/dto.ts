export type PollOptionResponse = {
  id: string;
  text: string;
};

export type PollResponse = {
  id: string;
  title: string;
  description: string | null;
  options: PollOptionResponse[];
};
