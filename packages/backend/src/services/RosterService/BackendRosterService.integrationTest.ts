import { testRosterService } from "@rotaro/core/dist/services/RosterService/RosterService.testTemplate";
import { SystemConfig } from "@tsukiy0/tscore";
import { DynamoRosterRepository } from "../RosterRepository/DynamoRosterRepository";
import { BackendRosterService } from "./BackendRosterService";

describe("BackendRosterService", () => {
  testRosterService(async (callback) => {
    const config = new SystemConfig();
    const repo = await DynamoRosterRepository.dev(config.get("DYNAMODB_URL"));
    const service = new BackendRosterService(repo);

    await callback(service);
  });
});
