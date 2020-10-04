import {
  PersonIdRandomizer,
  Roster,
  RosterIdRandomizer,
  PersonRotation,
  PersonList,
  Person,
  PersonDays,
  Days,
  Schedule,
  Hour,
  Day,
  DayList,
} from "@rotaro/core";
import { RosterRepository } from "./RosterRepository";

export const testRosterRepository = (
  setup: (run: (repo: RosterRepository) => Promise<void>) => Promise<void>,
): void => {
  const buildRoster = (partial?: Partial<Roster>) => {
    const personId = PersonIdRandomizer.random();

    return new Roster(
      partial?.id ?? RosterIdRandomizer.random(),
      partial?.rotation ??
        new PersonRotation(
          new PersonList([new Person(personId, "bob")]),
          [new PersonDays(personId, new Days(2))],
          new Days(1),
        ),
      partial?.schedule ??
        new Schedule(
          new DayList([
            Day.MONDAY,
            Day.TUESDAY,
            Day.WEDNESDAY,
            Day.THURSDAY,
            Day.FRIDAY,
          ]),
          Hour._14,
        ),
    );
  };

  describe("getRoster", () => {
    it("get existing", async () => {
      await setup(async (repo) => {
        const roster = buildRoster();
        await repo.createRoster(roster);

        const actual = await repo.getRoster(roster.id);

        expect(actual?.equals(roster)).toBeTruthy();
      });
    });

    it("not get non-existant", async () => {
      await setup(async (repo) => {
        const roster = buildRoster();

        const actual = await repo.getRoster(roster.id);

        expect(actual).toBeUndefined();
      });
    });
  });

  describe("createRoster", () => {
    it("create", async () => {
      await setup(async (repo) => {
        const roster = buildRoster();
        await repo.createRoster(roster);

        const actual = await repo.getRoster(roster.id);

        expect(actual?.equals(roster)).toBeTruthy();
      });
    });
  });

  describe("updateRoster", () => {
    it("update existing", async () => {
      await setup(async (repo) => {
        const roster1 = buildRoster();
        const roster2 = buildRoster({
          id: roster1.id,
        });
        await repo.createRoster(roster1);

        await repo.updateRoster(roster2);
        const actual = await repo.getRoster(roster1.id);

        expect(actual?.equals(roster2)).toBeTruthy();
      });
    });
  });

  describe("deleteRoster", () => {
    it("delete existing", async () => {
      await setup(async (repo) => {
        const roster = buildRoster();
        await repo.createRoster(roster);

        await repo.deleteRoster(roster.id);
        const actual = await repo.getRoster(roster.id);

        expect(actual).toBeUndefined();
      });
    });
  });

  describe("listRostersByDayAndHour", () => {
    it("filter by hours", async () => {
      await setup(async (repo) => {
        const roster1 = buildRoster({
          schedule: new Schedule(
            new DayList([
              Day.MONDAY,
              Day.TUESDAY,
              Day.WEDNESDAY,
              Day.THURSDAY,
              Day.FRIDAY,
              Day.SATURDAY,
              Day.SUNDAY,
            ]),
            Hour._01,
          ),
        });
        const roster2 = buildRoster({
          schedule: new Schedule(
            new DayList([
              Day.MONDAY,
              Day.TUESDAY,
              Day.WEDNESDAY,
              Day.THURSDAY,
              Day.FRIDAY,
              Day.SATURDAY,
              Day.SUNDAY,
            ]),
            Hour._02,
          ),
        });
        await repo.createRoster(roster1);
        await repo.createRoster(roster2);

        const actual = await repo.listRostersByDayAndHour(Day.MONDAY, Hour._02);

        debugger;

        expect(actual).toHaveLength(1);
        expect(actual[0].equals(roster2)).toBeTruthy();
      });
    });

    it("filter by day", async () => {
      await setup(async (repo) => {
        const roster1 = buildRoster({
          schedule: new Schedule(new DayList([Day.WEDNESDAY]), Hour._01),
        });
        const roster2 = buildRoster({
          schedule: new Schedule(new DayList([Day.TUESDAY]), Hour._01),
        });
        await repo.createRoster(roster1);
        await repo.createRoster(roster2);

        const actual = await repo.listRostersByDayAndHour(
          Day.TUESDAY,
          Hour._01,
        );

        expect(actual).toHaveLength(1);
        expect(actual[0].equals(roster2)).toBeTruthy();
      });
    });
  });
};
