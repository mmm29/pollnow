export type PollOptionResponse = {
  id: string;
  text: string;
  selected: boolean;
};

export type PollResponse = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  can_edit: boolean;
  options: PollOptionResponse[];
};

export type PollCompletion = {
  option_id: string;
};

export type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
};
