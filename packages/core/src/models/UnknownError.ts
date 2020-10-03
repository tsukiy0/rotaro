import { BaseError, Serializer } from "@tsukiy0/tscore";

export class UnknownError extends BaseError {
  constructor(public readonly type: string, public readonly message: string) {
    super();
  }
}

export type UnknownErrorJson = {
  name: "UnknownError";
  context: {
    type: string;
    message: string;
  };
};

export const UnknownErrorSerializer: Serializer<Error, UnknownErrorJson> = {
  serialize: (input) => {
    return {
      name: "UnknownError",
      context: {
        type: input.name,
        message: input.message,
      },
    };
  },
  deserialize: (input) => {
    return new UnknownError(input.context.type, input.context.message);
  },
};
