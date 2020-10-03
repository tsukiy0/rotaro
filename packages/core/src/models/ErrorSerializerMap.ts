import { Serializer } from "@tsukiy0/tscore";
import {
  RosterNotFoundError,
  RosterNotFoundErrorSerializer,
} from "../services/RosterService/RosterNotFoundError";
import { UnknownErrorSerializer } from "./UnknownError";

export class ErrorSerializerMapClass {
  constructor(
    private readonly serializers: readonly {
      errorConstructor: NewableFunction;
      serializer: Serializer<unknown, unknown>;
    }[],
  ) {}

  public readonly fromConstructor = (
    constructor: unknown,
  ): Serializer<unknown, unknown> => {
    const found = this.serializers.find(
      (_) => _.errorConstructor === constructor,
    );

    if (!found) {
      return UnknownErrorSerializer;
    }

    return found.serializer;
  };

  public readonly fromName = (name: string): Serializer<unknown, unknown> => {
    const found = this.serializers.find(
      (_) => _.errorConstructor.name === name,
    );

    if (!found) {
      return UnknownErrorSerializer;
    }

    return found.serializer;
  };

  public readonly fromInstance = (
    instance: Error,
  ): Serializer<unknown, unknown> => {
    const found = this.serializers.find(
      (_) => instance.constructor.name === _.errorConstructor.name,
    );

    if (!found) {
      return UnknownErrorSerializer;
    }

    return found.serializer;
  };
}

export const ErrorSerializerMap = new ErrorSerializerMapClass([
  {
    errorConstructor: RosterNotFoundError,
    serializer: RosterNotFoundErrorSerializer,
  },
]);
