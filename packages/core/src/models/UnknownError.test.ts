import { UnknownError, UnknownErrorSerializer } from "./UnknownError";

describe("UnknownError", () => {
  it("serializes", () => {
    const error = new EvalError("hello");
    const raw = UnknownErrorSerializer.serialize(error);

    const actual = UnknownErrorSerializer.deserialize(raw);

    expect(actual).toBeInstanceOf(UnknownError);
    expect((actual as UnknownError).type).toEqual(error.name);
    expect((actual as UnknownError).message).toEqual(error.message);
  });
});
