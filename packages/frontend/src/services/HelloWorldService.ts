import { ApiService } from "./ApiService/ApiService";

type PingResponse = {
  message: string;
};

export class HelloWorldService {
  constructor(private readonly apiService: ApiService) {}

  public readonly ping = async (): Promise<PingResponse> => {
    const result = await this.apiService.request<void, PingResponse>(
      "/",
      undefined,
    );

    return result;
  };
}
