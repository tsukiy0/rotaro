import {
  testComparable,
  testSerializer,
} from "@tsukiy0/tscore/dist/index.testTemplate";
import { Day } from "./Day";
import { DayList } from "./DayList";
import { Hour } from "./Hour";
import { Schedule, ScheduleSerializer } from "./Schedule";

describe("Schedule", () => {
  testComparable(
    () => new Schedule(new DayList([Day.MONDAY, Day.WEDNESDAY]), Hour._14),
  );
  testSerializer(
    ScheduleSerializer,
    () => new Schedule(new DayList([Day.MONDAY, Day.WEDNESDAY]), Hour._14),
  );
});
