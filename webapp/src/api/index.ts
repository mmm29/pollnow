import { stringifyError } from "../utils";

export class ApiClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getMe(): Promise<ApiResult<User | null>> {
    return await this._get("/me");
  }

  async login(username: string, password: string): Promise<ApiResult<User>> {
    return await this._post("/login", {
      username,
      password,
    });
  }

  async register(username: string, password: string): Promise<ApiResult<User>> {
    return await this._post("/register", {
      username,
      password,
    });
  }

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

export type User = {
  username: string;
};

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error_message?: string;
};

export const apiClient = new ApiClient("http://localhost:8114");
