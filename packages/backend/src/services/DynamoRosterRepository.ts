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
} from "@rotaro/core";
import { DynamoDB } from "aws-sdk";
import { RosterRepository } from "./RosterRepository";

type RosterDocument = {
  id: string;
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

    return new Roster(
      RosterId.fromString(item.id),
      new PersonRotation(
        new PersonList(
          item.rotation.personList.map((_) => {
            return new Person(PersonId.fromString(_.id), _.name);
          }),
        ),
        item.rotation.rotation.map((_) => {
          return new PersonDays(
            PersonId.fromString(_.personId),
            new Days(_.days),
          );
        }),
        new Days(item.rotation.cursor),
      ),
      new Schedule(
        item.schedule.monday,
        item.schedule.tuesday,
        item.schedule.wednesday,
        item.schedule.thursday,
        item.schedule.friday,
        item.schedule.saturday,
        item.schedule.sunday,
        hourFromString(item.schedule.hour),
      ),
    );
  };

  public readonly createRoster = async (roster: Roster): Promise<void> => {
    const document: RosterDocument = {
      id: roster.id.toString(),
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
}
