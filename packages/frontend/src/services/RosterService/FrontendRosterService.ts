import {
  Roster,
  RosterId,
  RosterIdJson,
  RosterIdSerializer,
  RosterJson,
  RosterSerializer,
  RosterService,
} from "@rotaro/core";
import { ApiService } from "../ApiService/ApiService";

export class FrontendRosterService implements RosterService {
  constructor(private readonly apiService: ApiService) {}

  public readonly getRoster = async (rosterId: RosterId): Promise<Roster> => {
    const result = await this.apiService.request<RosterIdJson, RosterJson>(
      "/getRoster",
      RosterIdSerializer.serialize(rosterId),
    );

    return RosterSerializer.deserialize(result);
  };

  public readonly createRoster = async (roster: Roster): Promise<void> => {
    await this.apiService.request<RosterJson, void>(
      "/createRoster",
      RosterSerializer.serialize(roster),
    );
  };

  public readonly deleteRoster = async (rosterId: RosterId): Promise<void> => {
    await this.apiService.request<RosterIdJson, void>(
      "/deleteRoster",
      RosterIdSerializer.serialize(rosterId),
    );
  };
}
