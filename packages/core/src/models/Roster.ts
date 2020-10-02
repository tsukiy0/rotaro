import { BaseError, Comparable, Guid, GuidRandomizer } from "@tsukiy0/tscore";
import { PersonRotation } from "./PersonRotation";
import { Schedule } from "./Schedule";

export class RosterId extends Guid {}

export const RosterIdRandomizer = {
  random: (): RosterId => {
    return RosterId.fromString(GuidRandomizer.random().toString());
  },
};

export class Roster implements Comparable {
  constructor(
    public readonly id: RosterId,
    public readonly rotation: PersonRotation,
    public readonly schedule: Schedule,
  ) {}

  public readonly equals = (input: this): boolean => {
    return (
      this.id.equals(input.id) &&
      this.rotation.equals(input.rotation) &&
      this.schedule.equals(input.schedule)
    );
  };
}
