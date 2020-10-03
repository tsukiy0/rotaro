import {
  BaseError,
  Comparable,
  Guid,
  GuidRandomizer,
  Serializer,
} from "@tsukiy0/tscore";
import {
  PersonRotation,
  PersonRotationJson,
  PersonRotationSerializer,
} from "./PersonRotation";
import { Schedule, ScheduleJson, ScheduleSerializer } from "./Schedule";

export class RosterId extends Guid {}

export type RosterIdJson = {
  value: string;
};

export const RosterIdSerializer: Serializer<RosterId, RosterIdJson> = {
  serialize: (input) => {
    return {
      value: input.toString(),
    };
  },
  deserialize: (input) => {
    return RosterId.fromString(input.value);
  },
};

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

export type RosterJson = {
  id: RosterIdJson;
  rotation: PersonRotationJson;
  schedule: ScheduleJson;
};

export const RosterSerializer: Serializer<Roster, RosterJson> = {
  serialize: (input) => {
    return {
      id: RosterIdSerializer.serialize(input.id),
      rotation: PersonRotationSerializer.serialize(input.rotation),
      schedule: ScheduleSerializer.serialize(input.schedule),
    };
  },
  deserialize: (input) => {
    return new Roster(
      RosterIdSerializer.deserialize(input.id),
      PersonRotationSerializer.deserialize(input.rotation),
      ScheduleSerializer.deserialize(input.schedule),
    );
  },
};
