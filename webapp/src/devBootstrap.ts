import { Application } from "./app";
import { AuthApi, createAuthService } from "./app/services/auth";
import { createPollService } from "./app/services/poll";
import { err, ok, Result } from "neverthrow";
import { Poll, PollId, User } from "./app/models";
import { PollRepository } from "./app/repos";
import { PollDesc } from "./app/dto";

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
  async createPoll(poll: PollDesc): Promise<Result<PollId, string>> {
    return ok("1");
  }

  async getAll(): Promise<Result<Poll[], string>> {
    const numPolls = 10;
    const numOptions = 5;
    const MOCK_POLLS: Poll[] = Array.from({ length: numPolls }, (_, i) => ({
      id: String(i),
      title: "Poll " + i,
      description: "Poll asad " + i,
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
