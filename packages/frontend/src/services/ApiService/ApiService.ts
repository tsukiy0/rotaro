export interface ApiService {
  request<TRequest, TResponse>(
    urlPath: string,
    request: TRequest,
  ): Promise<TResponse>;
}
