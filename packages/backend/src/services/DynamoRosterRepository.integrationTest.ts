import { StringRandomizer, SystemConfig } from "@tsukiy0/tscore";
import { CredentialProviderChain, Credentials, DynamoDB } from "aws-sdk";
import { DynamoRosterRepository } from "./DynamoRosterRepository";
import { testRosterRepository } from "./RosterRepository.testTemplate";

describe("DynamoRosterRepository", () => {
  testRosterRepository(async (callback) => {
    const config = new SystemConfig();
    const tableName = StringRandomizer.random();
    const options: DynamoDB.ClientConfiguration = {
      endpoint: config.get("DYNAMODB_URL"),
      region: "us-east-1",
      credentialProvider: new CredentialProviderChain([
        () => new Credentials("", ""),
      ]),
    };
    const normalDynamo = new DynamoDB(options);

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
      new DynamoDB.DocumentClient(options),
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
