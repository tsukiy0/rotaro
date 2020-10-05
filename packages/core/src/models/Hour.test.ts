import { DateTime } from "@tsukiy0/tscore";
import {
  hourFromString,
  Hour,
  BadHourStringError,
  hourFromDateTime,
} from "./Hour";

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

  describe("hourFromDateTime", () => {
    [
      {
        input: DateTime.fromISOString("2012-01-01T01:00:00Z"),
        output: Hour._01,
      },
      {
        input: DateTime.fromISOString("2012-01-01T02:00:00Z"),
        output: Hour._02,
      },
      {
        input: DateTime.fromISOString("2012-01-01T03:00:00Z"),
        output: Hour._03,
      },
      {
        input: DateTime.fromISOString("2012-01-01T04:00:00Z"),
        output: Hour._04,
      },
      {
        input: DateTime.fromISOString("2012-01-01T05:00:00Z"),
        output: Hour._05,
      },
      {
        input: DateTime.fromISOString("2012-01-01T06:00:00Z"),
        output: Hour._06,
      },
      {
        input: DateTime.fromISOString("2012-01-01T07:00:00Z"),
        output: Hour._07,
      },
      {
        input: DateTime.fromISOString("2012-01-01T08:00:00Z"),
        output: Hour._08,
      },
      {
        input: DateTime.fromISOString("2012-01-01T09:00:00Z"),
        output: Hour._09,
      },
      {
        input: DateTime.fromISOString("2012-01-01T10:00:00Z"),
        output: Hour._10,
      },
      {
        input: DateTime.fromISOString("2012-01-01T11:00:00Z"),
        output: Hour._11,
      },
      {
        input: DateTime.fromISOString("2012-01-01T12:00:00Z"),
        output: Hour._12,
      },
      {
        input: DateTime.fromISOString("2012-01-01T13:00:00Z"),
        output: Hour._13,
      },
      {
        input: DateTime.fromISOString("2012-01-01T14:00:00Z"),
        output: Hour._14,
      },
      {
        input: DateTime.fromISOString("2012-01-01T15:00:00Z"),
        output: Hour._15,
      },
      {
        input: DateTime.fromISOString("2012-01-01T16:00:00Z"),
        output: Hour._16,
      },
      {
        input: DateTime.fromISOString("2012-01-01T17:00:00Z"),
        output: Hour._17,
      },
      {
        input: DateTime.fromISOString("2012-01-01T18:00:00Z"),
        output: Hour._18,
      },
      {
        input: DateTime.fromISOString("2012-01-01T19:00:00Z"),
        output: Hour._19,
      },
      {
        input: DateTime.fromISOString("2012-01-01T20:00:00Z"),
        output: Hour._20,
      },
      {
        input: DateTime.fromISOString("2012-01-01T21:00:00Z"),
        output: Hour._21,
      },
      {
        input: DateTime.fromISOString("2012-01-01T22:00:00Z"),
        output: Hour._22,
      },
      {
        input: DateTime.fromISOString("2012-01-01T23:00:00Z"),
        output: Hour._23,
      },
      {
        input: DateTime.fromISOString("2012-01-01T00:00:00Z"),
        output: Hour._24,
      },
    ].forEach(({ input, output }) => {
      it("does it", () => {
        const actual = hourFromDateTime(input);

        expect(actual).toEqual(output);
      });
    });
  });
});
