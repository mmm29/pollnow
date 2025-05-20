import { stringifyError } from "../../utils";

import { PollDesc } from "@/app/dto";
import { PollId } from "@/app/models";
import { PollOptionResponse, PollResponse } from "./dto";
import { Result } from "neverthrow";

export class ApiClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //
  // Authentication
  async getMe(): Promise<ApiResult<UserDto | null>> {
    return await this._get("/me");
  }

  async login(username: string, password: string): Promise<ApiResult<UserDto>> {
    return await this._post("/login", {
      username,
      password,
    });
  }

  async register(
    username: string,
    password: string
  ): Promise<ApiResult<UserDto>> {
    return await this._post("/register", {
      username,
      password,
    });
  }

  //
  // Poll
  async createPoll(poll: PollDesc): Promise<ApiResult<PollId>> {
    type CreatePollresult = {
      poll_id: string;
    };
    return mapResult<CreatePollresult, PollId>(
      await this._post("/poll", poll),
      (r) => r.poll_id
    );
  }

  async getAllPolls(): Promise<ApiResult<PollResponse[]>> {
    return await this._get("/poll");
  }

  async getPollById(pollId: string): Promise<ApiResult<PollResponse>> {
    return await this._get("/poll/" + pollId);
  }

  //
  // Service
  async _get<T>(path: string): Promise<ApiResult<T>> {
    return await this._request("GET", path, null);
  }

  async _post<T, P>(path: string, body?: P): Promise<ApiResult<T>> {
    return await this._request("POST", path, body);
  }

  async _request<T, P>(
    method: string,
    path: string,
    body?: P
  ): Promise<ApiResult<T>> {
    // Do the request.
    const response = await fetch(this.endpoint + path, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    // Check for network failure.
    if (!response.ok) {
      return {
        ok: false,
        status: 502,
        error_message: "network request failed",
      };
    }

    // Read body.
    let data = null;
    let detail: string = "";
    let err = null;
    try {
      data = await response.json();
      detail = data.detail;
    } catch (error) {
      err = error;
    }

    // Check the response status.
    if (response.status >= 300) {
      return {
        ok: false,
        status: response.status,
        error_message: detail,
      };
    }

    // Parse the response.
    if (err) {
      return {
        ok: false,
        status: 400,
        error_message: stringifyError(err),
      };
    }

    return {
      ok: true,
      status: response.status,
      data,
    };
  }
}

export type UserDto = {
  username: string;
};

export type ApiResult<T> = { status: number } & (
  | {
      ok: false;
      error_message: string;
    }
  | {
      ok: true;
      data: T;
    }
);

function mapResult<F, T>(
  obj: ApiResult<F>,
  mapCallback: (value: F) => T
): ApiResult<T> {
  if (!obj.ok) {
    return obj;
  }

  return {
    ok: true,
    status: obj.status,
    data: mapCallback(obj.data),
  };
}
