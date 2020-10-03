import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import {
  BadHourStringError,
  Hour,
  hourFromString,
  Schedule,
  ScheduleSerializer,
} from "./Schedule";

describe("Schedule", () => {
  testComparable(
    () => new Schedule(true, true, true, true, true, false, false, Hour._14),
  );
  testSerializer(
    ScheduleSerializer,
    () => new Schedule(true, true, true, true, true, false, false, Hour._14),
  );
});

describe("Hour", () => {
  describe("hourFromString", () => {
    it("does it", () => {
      const actual = hourFromString("24");

      expect(actual).toEqual(Hour._24);
    });

    it("throws when not match", () => {
      expect(() => {
        hourFromString("25");
      }).toThrowError(BadHourStringError);
    });
  });
});
