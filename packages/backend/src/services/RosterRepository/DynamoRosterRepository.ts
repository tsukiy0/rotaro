import {
  RosterId,
  Roster,
  PersonRotation,
  Schedule,
  PersonList,
  Person,
  PersonId,
  PersonDays,
  Days,
  hourFromString,
  Hour,
  Day,
} from "@rotaro/core";
import { StringRandomizer } from "@tsukiy0/tscore";
import { CredentialProviderChain, Credentials, DynamoDB } from "aws-sdk";
import { RosterRepository } from "./RosterRepository";

type RosterDocument = {
  id: string;
  scheduleHour: string;
  rotation: {
    personList: readonly {
      id: string;
      name: string;
    }[];
    rotation: readonly {
      personId: string;
      days: number;
    }[];
    cursor: number;
  };
  schedule: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    hour: string;
  };
};

export class DynamoRosterRepository implements RosterRepository {
  constructor(
    private readonly dynamo: DynamoDB.DocumentClient,
    private readonly tableName: string,
  ) {}

  public static readonly prod = (tableName: string): RosterRepository => {
    return new DynamoRosterRepository(new DynamoDB.DocumentClient(), tableName);
  };

  public static readonly dev = async (
    dynamoUrl: string,
  ): Promise<RosterRepository> => {
    const tableName = StringRandomizer.random();
    const options: DynamoDB.ClientConfiguration = {
      endpoint: dynamoUrl,
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
        GlobalSecondaryIndexes: [
          {
            IndexName: "scheduleHour_id",
            KeySchema: [
              {
                AttributeName: "scheduleHour",
                KeyType: "HASH",
              },
              {
                AttributeName: "id",
                KeyType: "SORT",
              },
            ],
            Projection: {
              ProjectionType: "ALL",
            },
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: "id",
            AttributeType: "S",
          },
          {
            AttributeName: "scheduleHour",
            AttributeType: "S",
          },
        ],
        BillingMode: "PAY_PER_REQUEST",
      })
      .promise();

    return new DynamoRosterRepository(
      new DynamoDB.DocumentClient(options),
      tableName,
    );
  };

  public readonly getRoster = async (
    rosterId: RosterId,
  ): Promise<Roster | undefined> => {
    const res = await this.dynamo
      .get({
        TableName: this.tableName,
        Key: {
          id: rosterId.toString(),
        },
      })
      .promise();

    if (!res.Item) {
      return undefined;
    }

    const item = res.Item as RosterDocument;

    return this.fromRosterDocument(item);
  };

  public readonly createRoster = async (roster: Roster): Promise<void> => {
    const document: RosterDocument = {
      id: roster.id.toString(),
      scheduleHour: roster.schedule.hour,
      rotation: {
        personList: roster.rotation.personList.items.map((_) => {
          return {
            id: _.id.toString(),
            name: _.name,
          };
        }),
        rotation: roster.rotation.rotation.map((_) => {
          return {
            personId: _.personId.toString(),
            days: _.days.toNumber(),
          };
        }),
        cursor: roster.rotation.cursor.toNumber(),
      },
      schedule: {
        monday: roster.schedule.monday,
        tuesday: roster.schedule.tuesday,
        wednesday: roster.schedule.wednesday,
        thursday: roster.schedule.thursday,
        friday: roster.schedule.friday,
        saturday: roster.schedule.saturday,
        sunday: roster.schedule.sunday,
        hour: roster.schedule.hour,
      },
    };

    await this.dynamo
      .put({
        TableName: this.tableName,
        Item: document,
      })
      .promise();
  };

  public readonly updateRoster = this.createRoster;

  public readonly deleteRoster = async (rosterId: RosterId): Promise<void> => {
    await this.dynamo
      .delete({
        TableName: this.tableName,
        Key: {
          id: rosterId.toString(),
        },
      })
      .promise();
  };

  public readonly listRostersByDayAndHour = async (
    day: Day,
    hour: Hour,
  ): Promise<readonly Roster[]> => {
    const result = await this.dynamo
      .query({
        TableName: this.tableName,
        IndexName: "scheduleHour_id",
        KeyConditionExpression: "#hashName = :hashValue",
        ExpressionAttributeNames: {
          "#hashName": "scheduleHour",
        },
        ExpressionAttributeValues: {
          ":hashValue": hour,
        },
        // handle pagination
        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html
      })
      .promise();

    if (!result.Items) {
      return [];
    }

    return result.Items.map((_) => {
      return this.fromRosterDocument(_ as RosterDocument);
    }).filter((_) => {
      switch (day) {
        case Day.MONDAY:
          return _.schedule.monday;
        case Day.TUESDAY:
          return _.schedule.tuesday;
        case Day.WEDNESDAY:
          return _.schedule.wednesday;
        case Day.THURSDAY:
          return _.schedule.thursday;
        case Day.FRIDAY:
          return _.schedule.friday;
        case Day.SATURDAY:
          return _.schedule.saturday;
        case Day.SUNDAY:
          return _.schedule.sunday;
      }
    });
  };

  private readonly fromRosterDocument = (doc: RosterDocument): Roster => {
    return new Roster(
      RosterId.fromString(doc.id),
      new PersonRotation(
        new PersonList(
          doc.rotation.personList.map((_) => {
            return new Person(PersonId.fromString(_.id), _.name);
          }),
        ),
        doc.rotation.rotation.map((_) => {
          return new PersonDays(
            PersonId.fromString(_.personId),
            new Days(_.days),
          );
        }),
        new Days(doc.rotation.cursor),
      ),
      new Schedule(
        doc.schedule.monday,
        doc.schedule.tuesday,
        doc.schedule.wednesday,
        doc.schedule.thursday,
        doc.schedule.friday,
        doc.schedule.saturday,
        doc.schedule.sunday,
        hourFromString(doc.schedule.hour),
      ),
    );
  };
}
