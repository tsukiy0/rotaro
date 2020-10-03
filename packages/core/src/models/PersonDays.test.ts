import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { DaysRandomizer } from "./Days";
import { PersonIdRandomizer } from "./Person";
import { PersonDays, PersonDaysSerializer } from "./PersonDays";

describe("PersonDays", () => {
  testComparable(
    () => new PersonDays(PersonIdRandomizer.random(), DaysRandomizer.random()),
  );
  testSerializer(
    PersonDaysSerializer,
    () => new PersonDays(PersonIdRandomizer.random(), DaysRandomizer.random()),
  );
});
