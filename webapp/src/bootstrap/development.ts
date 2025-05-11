import { Application } from "@/app";
import { err, ok, Result } from "neverthrow";
import { Poll, PollId, User } from "@/app/models";
import { PollRepository } from "@/app/repos";
import { PollDesc } from "@/app/dto";
import { AuthApi, createAuthService } from "@/app/services/auth";
import { createPollService } from "@/app/services/poll";
import { isInitialized } from "@/ui/hooks/auth";

export function createDevApplication(): Application {
  return {
    authService: createAuthService(new DevAuthApi()),
    pollService: createPollService(new DevPollRepository()),
  };
}

class DevAuthApi implements AuthApi {
  async getMe(): Promise<User | null> {
    return null;
  }
  async login(
    username: string,
    password: string
  ): Promise<Result<void, string>> {
    throw new Error("Method not implemented.");
  }
  async register(
    username: string,
    password: string
  ): Promise<Result<void, string>> {
    throw new Error("Method not implemented.");
  }
  async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export class DevPollRepository implements PollRepository {
  polls: Poll[];
  nextPollId: number;

  constructor() {
    this.polls = [];
    this.nextPollId = 0;

    this._init();
  }

  async _init() {
    const numPolls = 10;
    const numOptions = 5;

    for (let i = 0; i < numPolls; i++) {
      await this.createPoll({
        title: "Poll " + i,
        description: "Description " + i,
        options: Array.from({ length: numOptions }, (_, j) => ({
          text: "Option " + j,
        })),
      });
    }
  }

  async createPoll(poll: PollDesc): Promise<Result<PollId, string>> {
    const pollId = String(this.nextPollId);
    this.nextPollId += 1;
    const options = poll.options.map((option, i) => ({
      id: String(i),
      text: option.text,
    }));
    const newPoll: Poll = {
      id: pollId,
      title: poll.title,
      description: poll.description,
      options,
    };
    this.polls.push(newPoll);
    return ok(pollId);
  }

  async getAll(): Promise<Result<Poll[], string>> {
    return ok(this.polls);
  }

  async findPollById(pollId: PollId): Promise<Result<Poll, string>> {
    const result = this.polls.find((poll) => poll.id == pollId);
    if (!result) {
      return err("not found");
    }

    return ok(result);
  }

  async deletePoll(pollId: PollId): Promise<Result<void, string>> {
    const idx = this.polls.findIndex((poll) => poll.id == pollId);
    if (idx == -1) {
      return err("not found");
    }

    delete this.polls[idx];
    return ok();
  }
}
