import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { DaysRandomizer } from "./Days";
import { PersonIdRandomizer } from "./Person";
import { PersonDays } from "./PersonDays";

describe("PersonDays", () => {
  testComparable(
    () => new PersonDays(PersonIdRandomizer.random(), DaysRandomizer.random()),
  );
});
