import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { Hour, Schedule } from "./Schedule";

describe("Schedule", () => {
  testComparable(
    () => new Schedule(true, true, true, true, true, false, false, Hour._14),
  );
});
