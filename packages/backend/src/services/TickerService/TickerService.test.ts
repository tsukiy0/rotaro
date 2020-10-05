import {
  Day,
  DayList,
  Days,
  Hour,
  Person,
  PersonDays,
  PersonIdRandomizer,
  PersonList,
  PersonRotation,
  Roster,
  RosterId,
  RosterIdRandomizer,
  Schedule,
} from "@rotaro/core";
import { Clock, DateTime } from "@tsukiy0/tscore";
import { BackendRosterService } from "../RosterService/BackendRosterService";
import { TickerService } from "./TickerService";

describe("TickerService", () => {
  describe("tickAllForNow", () => {
    const buildRoster = (): Roster => {
      const personId = PersonIdRandomizer.random();
      return new Roster(
        RosterIdRandomizer.random(),
        new PersonRotation(
          new PersonList([new Person(personId, "bob")]),
          [new PersonDays(personId, new Days(2))],
          new Days(1),
        ),
        new Schedule(new DayList([Day.MONDAY, Day.WEDNESDAY]), Hour._19),
      );
    };

    it("ticks all rosters matching day and hour now", async () => {
      const rosters = [buildRoster(), buildRoster()];
      const clock: Clock = {
        now: jest
          .fn()
          .mockReturnValue(DateTime.fromISOString("2020-10-05T19:20:00Z")),
      };
      const rosterService: BackendRosterService = {
        listRostersByDayAndHour: jest.fn().mockResolvedValue(rosters),
        tickRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new TickerService(rosterService, clock);

      await service.tickAllForNow();

      expect(rosterService.listRostersByDayAndHour).toHaveBeenCalledWith(
        Day.TUESDAY,
        Hour._19,
      );
      expect(rosterService.tickRoster).toHaveBeenCalledWith(
        expect.toSatisfy((input: RosterId) => input.equals(rosters[0].id)),
      );
      expect(rosterService.tickRoster).toHaveBeenCalledWith(
        expect.toSatisfy((input: RosterId) => input.equals(rosters[1].id)),
      );
    });
  });
});
