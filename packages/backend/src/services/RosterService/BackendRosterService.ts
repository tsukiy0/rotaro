import {
  Day,
  Hour,
  Roster,
  RosterId,
  RosterNotFoundError,
  RosterService,
} from "@rotaro/core";
import { DynamoRosterRepository } from "../RosterRepository/DynamoRosterRepository";
import { RosterRepository } from "../RosterRepository/RosterRepository";

export class BackendRosterService implements RosterService {
  constructor(private readonly rosterRepository: RosterRepository) {}

  public static readonly prod = (tableName: string): BackendRosterService => {
    const repo = DynamoRosterRepository.prod(tableName);
    return new BackendRosterService(repo);
  };

  public static readonly dev = async (
    dynamoUrl: string,
  ): Promise<BackendRosterService> => {
    const repo = await DynamoRosterRepository.dev(dynamoUrl);
    return new BackendRosterService(repo);
  };

  public readonly createRoster = async (roster: Roster): Promise<void> => {
    await this.rosterRepository.createRoster(roster);
  };

  public readonly deleteRoster = async (rosterId: RosterId): Promise<void> => {
    const roster = await this.rosterRepository.getRoster(rosterId);

    if (!roster) {
      throw new RosterNotFoundError();
    }

    await this.rosterRepository.deleteRoster(rosterId);
  };

  public readonly listRostersByDayAndHour = async (
    day: Day,
    hour: Hour,
  ): Promise<readonly Roster[]> => {
    return await this.rosterRepository.listRostersByDayAndHour(day, hour);
  };

  public readonly tickRoster = async (rosterId: RosterId): Promise<void> => {
    const roster = await this.rosterRepository.getRoster(rosterId);

    if (!roster) {
      throw new RosterNotFoundError();
    }

    const newRoster = new Roster(
      roster.id,
      roster.rotation.tick(),
      roster.schedule,
    );

    await this.rosterRepository.updateRoster(newRoster);
  };

  public readonly getRoster = async (rosterId: RosterId): Promise<Roster> => {
    const roster = await this.rosterRepository.getRoster(rosterId);

    if (!roster) {
      throw new RosterNotFoundError();
    }

    return roster;
  };
}
