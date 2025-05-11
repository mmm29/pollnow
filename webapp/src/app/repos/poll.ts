import { PollId } from "@/app/models";
import { PollDto } from "@/app/dto";
import { Result } from "neverthrow";

export interface PollRepository {
  createPoll(poll: PollDto): Promise<Result<PollId, string>>;
}
