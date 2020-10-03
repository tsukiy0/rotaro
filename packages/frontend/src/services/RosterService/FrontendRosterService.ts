import { Roster, RosterId, RosterService } from "@rotaro/core";
import { ApiService } from "../ApiService/ApiService";

export class FrontendRosterService implements RosterService {
  constructor(private readonly apiService: ApiService) {}

  public readonly createRoster = async (roster: Roster): Promise<void> => {
    throw new Error("Method not implemented.");
  };

  public readonly deleteRoster = async (rosterId: RosterId): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
