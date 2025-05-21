import { PollDesc } from "@/app/dto";
import { Poll, PollId } from "@/app/models";

import { Result } from "neverthrow";
import { PollCompletion } from "../models/poll";

export interface PollService {
  createPoll(poll: PollDesc): Promise<Result<PollId, string>>;
  getAllPolls(): Promise<Result<Poll[], string>>;
  findPollById(pollId: PollId): Promise<Result<Poll, string>>;
  completePoll(
    pollId: PollId,
    completion: PollCompletion
  ): Promise<Result<void, string>>;
  uncompletePoll(pollId: PollId): Promise<Result<void, string>>;
}
