import { SystemConfig } from "@tsukiy0/tscore";
import { DynamoRosterRepository } from "./DynamoRosterRepository";
import { testRosterRepository } from "./RosterRepository.testTemplate";

describe("DynamoRosterRepository", () => {
  testRosterRepository(async (callback) => {
    const config = new SystemConfig();
    const repo = await DynamoRosterRepository.dev(config.get("DYNAMODB_URL"));

    await callback(repo);
  });
});
