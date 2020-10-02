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
        new Schedule(true, true, true, true, true, false, false, Hour._14),
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
};
