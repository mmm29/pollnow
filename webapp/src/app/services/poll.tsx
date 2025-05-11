import { PollDesc } from "@/app/dto";
import { PollId } from "@/app/models";
import { PollRepository } from "@/app/repos";

import { Result } from "neverthrow";

export interface PollService {
  createPoll(poll: PollDesc): Promise<Result<PollId, string>>;
}

export function createPollService(repo: PollRepository): PollService {
  return {
    async createPoll(poll: PollDesc) {
      return await repo.createPoll(poll);
    },
  };
}
