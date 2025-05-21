import { stringifyError } from "../../utils";

import { PollDesc } from "@/app/dto";
import { PollId } from "@/app/models";
import { ChangePasswordRequest, PollOptionResponse, PollResponse } from "./dto";
import { UserDto, UserCredentials, AuthResponse } from "./types";
import { AuthToken } from "@/app/services/auth";

export interface AuthTokenProvider {
  getAuthToken(): Promise<AuthToken | null>;
}

export class ApiClient {
  endpoint: string;
  authTokenProvider: AuthTokenProvider;

  constructor(endpoint: string, authTokenProvider: AuthTokenProvider) {
    this.endpoint = endpoint;
    this.authTokenProvider = authTokenProvider;
  }

  //
  // Authentication
  async getMe(): Promise<ApiResult<UserDto | null>> {
    return await this._get("/me");
  }

  async login(credentials: UserCredentials): Promise<ApiResult<AuthToken>> {
    return mapResult<AuthResponse, AuthToken>(
      await this._post("/login", credentials),
      (r) => r.token
    );
  }

  async createUser(
    credentials: UserCredentials
  ): Promise<ApiResult<AuthToken>> {
    return mapResult<AuthResponse, AuthToken>(
      await this._post("/register", credentials),
      (r) => r.token
    );
  }

  async logout(): Promise<ApiResult<void>> {
    return await this._post("/logout");
  }

  //
  // Settings
  async changePassword(
    request: ChangePasswordRequest
  ): Promise<ApiResult<void>> {
    return await this._put("/password", request);
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

  async _put<T, P>(path: string, body?: P): Promise<ApiResult<T>> {
    return await this._request("PUT", path, body);
  }

  async _request<T, P>(
    method: string,
    path: string,
    body?: P
  ): Promise<ApiResult<T>> {
    // Build headers.
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const authToken = await this.authTokenProvider.getAuthToken();
    if (authToken) {
      headers["Authorization"] = "Bearer " + authToken;
    }

    const bodyRaw = body ? JSON.stringify(body) : null;

    // Do the request.
    let response = null;

    try {
      response = await fetch(this.endpoint + path, {
        method,
        headers,
        body: bodyRaw,
      });
    } catch (error) {
      return {
        ok: false,
        status: 502,
        error_message: "network request failed",
      };
    }

    // Read the body.
    let data = null;
    let detail: string = "";
    let err = null;
    try {
      data = await response.json();
    } catch (error) {
      err = error;
    }

    try {
      detail = data.detail;
    } catch (error) {}

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
