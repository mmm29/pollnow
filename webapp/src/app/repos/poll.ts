import { Poll, PollId } from "@/app/models";
import { PollDesc } from "@/app/dto";
import { Result } from "neverthrow";

export interface PollRepository {
  createPoll(poll: PollDesc): Promise<Result<PollId, string>>;
  getAll(): Promise<Result<Poll[], string>>;
  findPollById(pollId: PollId): Promise<Result<Poll, string>>;
  deletePoll(pollId: PollId): Promise<Result<void, string>>;
}
