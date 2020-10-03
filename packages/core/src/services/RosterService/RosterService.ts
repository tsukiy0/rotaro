import { Roster, RosterId } from "../../models/Roster";

export interface RosterService {
  getRoster(rosterId: RosterId): Promise<Roster>;
  createRoster(roster: Roster): Promise<void>;
  deleteRoster(rosterId: RosterId): Promise<void>;
}
