import { PollDto } from "@/app/dto";
import { PollId } from "@/app/models";
import { PollRepo } from "@/app/repos";

import { Result } from "neverthrow";

export interface PollService {
  createPoll(poll: PollDto): Promise<Result<PollId, string>>;
}

export function createPollService(repo: PollRepo): PollService {
  return {
    async createPoll(poll: PollDto) {
      return await repo.createPoll(poll);
    },
  };
}
