import { Day } from "../../models/Day";
import { DayList } from "../../models/DayList";
import { Days } from "../../models/Days";
import { Hour } from "../../models/Hour";
import { Person, PersonIdRandomizer } from "../../models/Person";
import { PersonDays } from "../../models/PersonDays";
import { PersonList } from "../../models/PersonList";
import { PersonRotation } from "../../models/PersonRotation";
import { Roster, RosterIdRandomizer } from "../../models/Roster";
import { Schedule } from "../../models/Schedule";
import { RosterNotFoundError } from "./RosterNotFoundError";
import { RosterService } from "./RosterService";

export const testRosterService = (
  setup: (run: (service: RosterService) => Promise<void>) => Promise<void>,
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
        new Schedule(new DayList([Day.MONDAY, Day.WEDNESDAY]), Hour._14),
    );
  };

  describe("getRoster", () => {
    it("get existing", async () => {
      await setup(async (service) => {
        const roster = buildRoster();
        await service.createRoster(roster);

        const actual = await service.getRoster(roster.id);

        expect(actual?.equals(roster)).toBeTruthy();
      });
    });

    it("not get non-existant", async () => {
      await setup(async (service) => {
        const roster = buildRoster();

        await expect(service.getRoster(roster.id)).rejects.toThrowError(
          RosterNotFoundError,
        );
      });
    });
  });

  describe("createRoster", () => {
    it("create", async () => {
      await setup(async (service) => {
        const roster = buildRoster();
        await service.createRoster(roster);

        const actual = await service.getRoster(roster.id);

        expect(actual?.equals(roster)).toBeTruthy();
      });
    });
  });

  describe("deleteRoster", () => {
    it("delete existing", async () => {
      await setup(async (service) => {
        const roster = buildRoster();
        await service.createRoster(roster);

        await service.deleteRoster(roster.id);

        await expect(service.getRoster(roster.id)).rejects.toThrowError(
          RosterNotFoundError,
        );
      });
    });
  });
};
