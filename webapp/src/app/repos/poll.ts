import { PollId } from "@/app/models";
import { PollDesc } from "@/app/dto";
import { Result } from "neverthrow";

export interface PollRepository {
  createPoll(poll: PollDesc): Promise<Result<PollId, string>>;
}
