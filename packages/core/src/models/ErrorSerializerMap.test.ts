import { RosterNotFoundError } from "../services/RosterService/RosterNotFoundError";
import { ErrorSerializerMap } from "./ErrorSerializerMap";

describe("ErrorSerializerMap", () => {
  it("know", () => {
    const serializer = ErrorSerializerMap[RosterNotFoundError.name];

    expect(serializer).toBeDefined();
  });
});
