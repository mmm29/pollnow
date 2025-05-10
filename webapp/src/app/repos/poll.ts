import { err, ok, Result } from "neverthrow";
import { PollId } from "@/app/models";
import { PollDto } from "@/app/dto";
import { ApiClient } from "@/api";

export interface PollRepo {
  createPoll(poll: PollDto): Promise<Result<PollId, string>>;
}

export function createApiPollRepo(apiClient: ApiClient): PollRepo {
  return {
    async createPoll(poll: PollDto): Promise<Result<PollId, string>> {
      const result = await apiClient.createPoll(poll);
      if (!result.ok) {
        return err(result.error_message);
      }

      return ok(result.data);
    },
  };
}
