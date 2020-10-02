import { Roster, RosterId } from "../models/Roster";

export interface RosterService {
  createRoster(roster: Roster): Promise<void>;
  deleteRoster(rosterId: RosterId): Promise<void>;
  moveForward(rosterId: RosterId): Promise<void>;
}
