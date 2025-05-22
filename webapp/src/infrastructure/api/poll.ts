import { err, ok, Result } from "neverthrow";
import { ApiClient } from "@/infrastructure/api";
import { PollDesc } from "@/app/dto";
import { Poll, PollId } from "@/app/models";
import { PollResponse } from "./dto";
import { PollService } from "@/app/services/poll";
import { PollCompletion } from "@/app/models/poll";
import { AppError } from "@/app/error";

function mapPoll(r: PollResponse): Poll {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    completed: r.completed,
    canEdit: r.can_edit,
    options: r.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      selected: opt.selected,
    })),
    statistics: r.statistics,
  };
}

export class PollApi implements PollService {
  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async createPoll(poll: PollDesc): Promise<Result<PollId, AppError>> {
    const result = await this.apiClient.createPoll(poll);
    if (!result.ok) {
      return err(result.error_message);
    }

    return ok(result.data);
  }

  async getAllPolls(): Promise<Result<Poll[], AppError>> {
    const result = await this.apiClient.getAllPolls();
    if (!result.ok) {
      return err(result.error_message);
    }

    const pollResponse = result.data;
    const polls: Poll[] = pollResponse.map(mapPoll);
    return ok(polls);
  }

  async getMyPolls(): Promise<Result<Poll[], AppError>> {
    const result = await this.apiClient.getMyPolls();
    if (!result.ok) {
      return err(result.error_message);
    }

    const pollResponse = result.data;
    const polls: Poll[] = pollResponse.map(mapPoll);
    return ok(polls);
  }

  async findPollById(pollId: PollId): Promise<Result<Poll, AppError>> {
    const result = await this.apiClient.getPollById(pollId);
    if (!result.ok) {
      return err(result.error_message);
    }

    const poll: Poll = mapPoll(result.data);
    return ok(poll);
  }

  async deletePoll(pollId: PollId): Promise<Result<void, AppError>> {
    const result = await this.apiClient.deletePoll(pollId);
    if (!result.ok) {
      return err(result.error_message);
    }

    return ok();
  }

  async completePoll(
    pollId: PollId,
    completion: PollCompletion
  ): Promise<Result<void, AppError>> {
    const result = await this.apiClient.completePoll(pollId, {
      option_id: completion.option_id,
    });

    if (!result.ok) {
      return err(result.error_message);
    }

    return ok();
  }

  async uncompletePoll(pollId: PollId): Promise<Result<void, AppError>> {
    const result = await this.apiClient.uncompletePoll(pollId);

    if (!result.ok) {
      return err(result.error_message);
    }

    return ok();
  }
}
