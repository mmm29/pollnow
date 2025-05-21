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

export type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
};
