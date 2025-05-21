import { PollDesc } from "@/app/dto";
import { Poll, PollId } from "@/app/models";

import { Result } from "neverthrow";
import { PollCompletion } from "../models/poll";
import { AppError } from "../error";

export interface PollService {
  createPoll(poll: PollDesc): Promise<Result<PollId, AppError>>;
  getAllPolls(): Promise<Result<Poll[], AppError>>;
  getMyPolls(): Promise<Result<Poll[], AppError>>;
  findPollById(pollId: PollId): Promise<Result<Poll, AppError>>;
  completePoll(
    pollId: PollId,
    completion: PollCompletion
  ): Promise<Result<void, AppError>>;
  uncompletePoll(pollId: PollId): Promise<Result<void, AppError>>;
}
