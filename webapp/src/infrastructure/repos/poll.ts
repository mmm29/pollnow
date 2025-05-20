import { err, ok, Result } from "neverthrow";
import { ApiClient } from "@/infrastructure/api";
import { PollRepository } from "@/app/repos";
import { PollDesc } from "@/app/dto";
import { Poll, PollId } from "@/app/models";
import { PollResponse } from "../api/dto";

function mapPoll(r: PollResponse): Poll {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    options: r.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
    })),
  };
}

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
    const result = await this.apiClient.getAllPolls();
    if (!result.ok) {
      return err(result.error_message);
    }

    const pollResponse = result.data;
    const polls: Poll[] = pollResponse.map(mapPoll);
    return ok(polls);
  }

  async findPollById(pollId: PollId): Promise<Result<Poll, string>> {
    const result = await this.apiClient.getPollById(pollId);
    if (!result.ok) {
      return err(result.error_message);
    }

    const poll: Poll = mapPoll(result.data);
    return ok(poll);
  }

  async deletePoll(pollId: PollId): Promise<Result<void, string>> {
    return err("not found");
  }
}
