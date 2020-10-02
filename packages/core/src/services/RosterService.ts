import { Roster, RosterId } from "../models/Roster";

export interface RosterService {
  createRoster(roster: Roster): void;
  deleteRoster(rosterId: RosterId): void;
  moveForward(rosterId: RosterId): void;
}
