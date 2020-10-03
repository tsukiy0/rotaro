import path from "path";
import FetchFunction from "isomorphic-fetch";
import { BaseError } from "@tsukiy0/tscore";
import { ErrorSerializerMap } from "@rotaro/core";

export class HttpError extends BaseError {
  constructor(public readonly status: number) {
    super({
      status,
    });
  }
}

export class FetchApiService {
  constructor(
    private readonly fetch: typeof FetchFunction,
    private readonly baseUrl: string,
  ) {}

  public readonly request = async <TRequest, TResponse>(
    urlPath: string,
    request: TRequest,
  ): Promise<TResponse> => {
    const res = await this.fetch(this.buildUrl(this.baseUrl, urlPath), {
      method: "POST",
      body: JSON.stringify(request ?? {}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resBody = await res.json();

    debugger;

    if (res.status === 400) {
      const serializer = ErrorSerializerMap.fromName(resBody.name);

      if (!serializer) {
        throw new HttpError(res.status);
      }

      throw serializer.deserialize(resBody);
    }

    if (res.status > 400) {
      throw new HttpError(res.status);
    }

    return resBody;
  };

  private readonly buildUrl = (baseUrl: string, urlPath: string): string => {
    const u = new URL(baseUrl);
    u.pathname = path.join(u.pathname, urlPath);

    return u.toString();
  };
}
