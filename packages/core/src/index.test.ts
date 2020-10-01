import { sum } from "./index";

describe("sum", () => {
  it("sums", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
