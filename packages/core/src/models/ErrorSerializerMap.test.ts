import {
  RosterNotFoundError,
  RosterNotFoundErrorSerializer,
} from "../services/RosterService/RosterNotFoundError";
import { UnknownErrorSerializer } from "./UnknownError";
import { ErrorSerializerMapClass } from "./ErrorSerializerMap";

describe("ErrorSerializerMap", () => {
  const map = new ErrorSerializerMapClass([
    {
      errorConstructor: RosterNotFoundError,
      serializer: RosterNotFoundErrorSerializer,
    },
  ]);

  describe("getFromConstructor", () => {
    it("default serializer when no match", () => {
      const serializer = map.fromConstructor(Error);

      expect(serializer).toEqual(UnknownErrorSerializer);
    });

    it("match known serializer", () => {
      const serializer = map.fromConstructor(RosterNotFoundError);

      expect(serializer).toEqual(RosterNotFoundErrorSerializer);
    });
  });

  describe("getFromName", () => {
    it("default serializer when no match", () => {
      const serializer = map.fromName("Error");

      expect(serializer).toEqual(UnknownErrorSerializer);
    });

    it("match known serializer", () => {
      const serializer = map.fromName("RosterNotFoundError");

      expect(serializer).toEqual(RosterNotFoundErrorSerializer);
    });
  });

  describe("getFromInstance", () => {
    it("default serializer when no match", () => {
      const serializer = map.fromInstance(new Error("hello"));

      expect(serializer).toEqual(UnknownErrorSerializer);
    });

    it("match known serializer", () => {
      const serializer = map.fromInstance(new RosterNotFoundError());

      expect(serializer).toEqual(RosterNotFoundErrorSerializer);
    });
  });
});
