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
  RosterId,
} from "@rotaro/core";
import { RosterRepository } from "../RosterRepository/RosterRepository";
import { RosterService, RosterNotFoundError } from "./RosterService";

describe("RosterService", () => {
  const buildRoster = (cursor?: Days) => {
    const personId = PersonIdRandomizer.random();
    return new Roster(
      RosterIdRandomizer.random(),
      new PersonRotation(
        new PersonList([new Person(personId, "bob")]),
        [new PersonDays(personId, new Days(2))],
        cursor ?? new Days(1),
      ),
      new Schedule(true, true, true, true, true, false, false, Hour._14),
    );
  };

  describe("createRoster", () => {
    it("calls repo", async () => {
      const roster = buildRoster();
      const repo: RosterRepository = {
        createRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await service.createRoster(roster);

      expect(repo.createRoster).toHaveBeenCalledWith(
        expect.toSatisfy((_: Roster) => _.equals(roster)),
      );
    });
  });

  describe("deleteRoster", () => {
    it("calls repo", async () => {
      const rosterId = RosterIdRandomizer.random();
      const repo: RosterRepository = {
        getRoster: jest.fn().mockResolvedValue(buildRoster()),
        deleteRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await service.deleteRoster(rosterId);

      expect(repo.deleteRoster).toHaveBeenCalledWith(
        expect.toSatisfy((_: RosterId) => _.equals(rosterId)),
      );
    });

    it("throws when roster does not exist", async () => {
      const rosterId = RosterIdRandomizer.random();
      const repo: RosterRepository = {
        getRoster: jest.fn().mockResolvedValue(undefined),
        deleteRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await expect(service.deleteRoster(rosterId)).rejects.toThrowError(
        RosterNotFoundError,
      );
    });
  });

  describe("tickRoster", () => {
    it("only changes cursor field", async () => {
      const roster = buildRoster(new Days(2));
      const rosterId = RosterIdRandomizer.random();
      const repo: RosterRepository = {
        getRoster: jest.fn().mockResolvedValue(roster),
        updateRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await service.tickRoster(rosterId);

      expect(repo.updateRoster).toHaveBeenCalledWith(
        expect.toSatisfy((_: Roster) =>
          _.equals(
            new Roster(
              roster.id,
              new PersonRotation(
                roster.rotation.personList,
                roster.rotation.rotation,
                new Days(1),
              ),
              roster.schedule,
            ),
          ),
        ),
      );
    });

    it("reset cursor when end of rotation", async () => {
      const rosterId = RosterIdRandomizer.random();
      const repo: RosterRepository = {
        getRoster: jest.fn().mockResolvedValue(buildRoster(new Days(2))),
        updateRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await service.tickRoster(rosterId);

      expect(repo.updateRoster).toHaveBeenCalledWith(
        expect.toSatisfy((_: Roster) => _.rotation.cursor.equals(new Days(1))),
      );
    });

    it("increments cursor when within rotation", async () => {
      const rosterId = RosterIdRandomizer.random();
      const repo: RosterRepository = {
        getRoster: jest.fn().mockResolvedValue(buildRoster(new Days(1))),
        updateRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await service.tickRoster(rosterId);

      expect(repo.updateRoster).toHaveBeenCalledWith(
        expect.toSatisfy((_: Roster) => _.rotation.cursor.equals(new Days(2))),
      );
    });

    it("throws when roster does not exist", async () => {
      const rosterId = RosterIdRandomizer.random();
      const repo: RosterRepository = {
        getRoster: jest.fn().mockResolvedValue(undefined),
        updateRoster: jest.fn().mockResolvedValue(undefined),
      } as any;
      const service = new RosterService(repo);

      await expect(service.tickRoster(rosterId)).rejects.toThrowError(
        RosterNotFoundError,
      );
    });
  });
});
