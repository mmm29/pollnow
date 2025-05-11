import { err, ok, Result } from "neverthrow";
import { ApiClient } from "@/infrastructure/api";
import { PollRepository } from "@/app/repos";
import { PollDesc } from "@/app/dto";
import { PollId } from "@/app/models";

export class ApiPollRepository implements PollRepository {
  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async createPoll(poll: PollDesc): Promise<Result<PollId, string>> {
    const result = await this.apiClient.createPoll(poll);
    if (!result.ok) {
      return err(result.error_message);
    }

    return ok(result.data);
  }
}
