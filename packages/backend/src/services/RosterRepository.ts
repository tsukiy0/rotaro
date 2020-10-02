import { Day, Roster, RosterId } from "@rotaro/core";
import { Hour } from "aws-sdk/clients/opsworks";

export interface RosterRepository {
  getRoster(rosterId: RosterId): Promise<Roster | undefined>;
  createRoster(roster: Roster): Promise<void>;
  updateRoster(roster: Roster): Promise<void>;
  deleteRoster(rosterId: RosterId): Promise<void>;
  listRostersByDayAndHour(day: Day, hour: Hour): Promise<readonly Roster[]>;
}
