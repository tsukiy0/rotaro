import { Roster, RosterId } from "../models/Roster";

export interface RosterService {
  createRoster(roster: Roster): Promise<void>;
  getRoster(rosterId: RosterId): Promise<Roster>;
  deleteRoster(rosterId: RosterId): Promise<void>;
  tickRoster(rosterId: RosterId): Promise<void>;
}
