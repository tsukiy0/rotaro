import { Roster, RosterId, RosterService } from "@rotaro/core";

export class DefaultRosterService implements RosterService {
  public readonly createRoster = (roster: Roster): Promise<void> => {
    throw new Error("Method not implemented.");
  };

  public readonly deleteRoster = (rosterId: RosterId): Promise<void> => {
    throw new Error("Method not implemented.");
  };

  public readonly moveForward = (rosterId: RosterId): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
