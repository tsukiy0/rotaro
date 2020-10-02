import { Roster, RosterId } from "@rotaro/core";

export interface RosterRepository {
  getRoster(rosterId: RosterId): Promise<Roster | undefined>;
  createRoster(roster: Roster): Promise<void>;
  updateRoster(roster: Roster): Promise<void>;
  deleteRoster(rosterId: RosterId): Promise<void>;
}
