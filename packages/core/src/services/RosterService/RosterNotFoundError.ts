import { BaseError, Serializer } from "@tsukiy0/tscore";

export class RosterNotFoundError extends BaseError {}

export type RosterNotFoundErrorJson = {
  name: string;
};

export const RosterNotFoundErrorSerializer: Serializer<
  RosterNotFoundError,
  RosterNotFoundErrorJson
> = {
  serialize: () => {
    return {
      name: RosterNotFoundError.name,
    };
  },
  deserialize: () => {
    return new RosterNotFoundError();
  },
};
