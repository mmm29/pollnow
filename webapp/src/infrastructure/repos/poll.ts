import { err, ok, Result } from "neverthrow";
import { ApiClient } from "@/infrastructure/api";
import { PollRepository } from "@/app/repos";
import { PollDesc } from "@/app/dto";
import { Poll, PollId } from "@/app/models";

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

  async getAll(): Promise<Result<Poll[], string>> {
    const numPolls = 10;
    const numOptions = 5;
    const MOCK_POLLS: Poll[] = Array.from({ length: numPolls }, (_, i) => ({
      id: String(i),
      title: "Poll " + i,
      description: "Poll description " + i,
      options: Array.from({ length: numOptions }, (_, j) => ({
        id: String(j),
        text: "option " + j,
      })),
    }));

    return ok(MOCK_POLLS);
  }

  async findPollById(pollId: PollId): Promise<Result<Poll, string>> {
    return err("not found");
  }

  async deletePoll(pollId: PollId): Promise<Result<void, string>> {
    return err("not found");
  }
}
