import {
  testComparable,
  testSerializer,
} from "@tsukiy0/tscore/dist/index.testTemplate";
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
