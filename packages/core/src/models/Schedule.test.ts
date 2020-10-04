import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { Hour } from "./Hour";
import { Schedule, ScheduleSerializer } from "./Schedule";

describe("Schedule", () => {
  testComparable(
    () => new Schedule(true, true, true, true, true, false, false, Hour._14),
  );
  testSerializer(
    ScheduleSerializer,
    () => new Schedule(true, true, true, true, true, false, false, Hour._14),
  );
});
