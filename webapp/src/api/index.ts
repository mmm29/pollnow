import { stringifyError } from "../utils";

import { PollDto } from "@/app/dto";
import { PollId } from "@/app/models";

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
  async createPoll(poll: PollDto): Promise<ApiResult<PollId>> {
    return await this._post("/poll", poll);
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

    // Check the response status.
    if (response.status >= 300) {
      return {
        ok: false,
        status: response.status,
        error_message: response.status.toString(),
      };
    }

    // Parse the response.
    // The response must always be a valid JSON.
    try {
      return {
        ok: true,
        status: response.status,
        data: await response.json(),
      };
    } catch (err) {
      return {
        ok: false,
        status: 400,
        error_message: stringifyError(err),
      };
    }
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
