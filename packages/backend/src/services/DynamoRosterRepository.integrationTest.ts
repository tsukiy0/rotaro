import { StringRandomizer, SystemConfig } from "@tsukiy0/tscore";
import { DynamoDB } from "aws-sdk";
import { DynamoRosterRepository } from "./DynamoRosterRepository";
import { testRosterRepository } from "./RosterRepository.testTemplate";

describe("DynamoRosterRepository", () => {
  testRosterRepository(async (callback) => {
    const config = new SystemConfig();
    const endpoint = config.get("DYNAMODB_URL");
    const tableName = StringRandomizer.random();
    const region = "us-east-1";
    const normalDynamo = new DynamoDB({
      endpoint,
      region,
    });

    await normalDynamo
      .createTable({
        TableName: tableName,
        KeySchema: [
          {
            AttributeName: "id",
            KeyType: "HASH",
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: "id",
            AttributeType: "S",
          },
        ],
        BillingMode: "PAY_PER_REQUEST",
      })
      .promise();

    const repo = new DynamoRosterRepository(
      new DynamoDB.DocumentClient({
        endpoint,
        region,
      }),
      tableName,
    );

    await callback(repo);

    await normalDynamo
      .deleteTable({
        TableName: tableName,
      })
      .promise();
  });
});
