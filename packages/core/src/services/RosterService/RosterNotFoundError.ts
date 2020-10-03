import { BaseError, Serializer } from "@tsukiy0/tscore";

export class RosterNotFoundError extends BaseError {}

export type RosterNotFoundErrorJson = {
  type: string;
};

export const RosterNotFoundErrorSerializer: Serializer<
  RosterNotFoundError,
  RosterNotFoundErrorJson
> = {
  serialize: () => {
    return {
      type: RosterNotFoundError.name,
    };
  },
  deserialize: () => {
    return new RosterNotFoundError();
  },
};
