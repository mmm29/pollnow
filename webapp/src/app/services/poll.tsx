import { PollDesc } from "@/app/dto";
import { Poll, PollId } from "@/app/models";
import { PollRepository } from "@/app/repos";

import { Result } from "neverthrow";

export interface PollService {
  createPoll(poll: PollDesc): Promise<Result<PollId, string>>;
  getAllPolls(): Promise<Result<Poll[], string>>;
  findPollById(pollId: PollId): Promise<Result<Poll, string>>;
}

export function createPollService(repo: PollRepository): PollService {
  return {
    async createPoll(poll: PollDesc) {
      return await repo.createPoll(poll);
    },
    async getAllPolls() {
      return await repo.getAll();
    },
    async findPollById(pollId) {
      return await repo.findPollById(pollId);
    },
  };
}
