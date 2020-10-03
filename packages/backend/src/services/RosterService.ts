import { Roster, RosterId } from "@rotaro/core";
import { BaseError } from "@tsukiy0/tscore";
import { RosterRepository } from "./RosterRepository";

export class RosterNotFoundError extends BaseError {}

export class RosterService {
  constructor(private readonly rosterRepository: RosterRepository) {}

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
