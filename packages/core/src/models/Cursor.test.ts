import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { CursorRandomizer } from "./Cursor";

describe("Cursor", () => {
  testComparable(() => CursorRandomizer.random());
});
