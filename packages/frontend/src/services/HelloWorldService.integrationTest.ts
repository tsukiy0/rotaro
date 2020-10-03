import { SystemConfig } from "@tsukiy0/tscore";
import fetch from "isomorphic-fetch";
import { FetchApiService } from "./ApiService/FetchApiService";
import { HelloWorldService } from "./HelloWorldService";

describe("HelloWorldService", () => {
  describe("ping", () => {
    it("pings", async () => {
      const config = new SystemConfig();
      const baseUrl = config.get("API_URL");
      const apiService = new FetchApiService(fetch, baseUrl);

      const service = new HelloWorldService(apiService);

      const result = await service.ping();

      expect(result.message).toEqual("hello world!");
    });
  });
});
