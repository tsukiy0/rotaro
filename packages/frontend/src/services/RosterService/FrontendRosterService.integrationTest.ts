import { SystemConfig } from "@tsukiy0/tscore";
import fetch from "isomorphic-fetch";
import { testRosterService } from "@rotaro/core/dist/services/RosterService/RosterService.testTemplate";
import { FetchApiService } from "../ApiService/FetchApiService";
import { FrontendRosterService } from "./FrontendRosterService";

describe("FrontendRosterService", () => {
  testRosterService(async (callback) => {
    const config = new SystemConfig();
    const baseUrl = config.get("API_URL");
    const apiService = new FetchApiService(fetch, baseUrl);

    const service = new FrontendRosterService(apiService);

    await callback(service);
  });
});
