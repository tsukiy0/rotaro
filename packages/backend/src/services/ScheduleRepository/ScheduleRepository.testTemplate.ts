import { RosterIdRandomizer, Schedule, Hour } from "@rotaro/core";
import { ScheduleRepository } from "./ScheduleRepository";

export const testRosterRepository = (
  setup: (run: (repo: ScheduleRepository) => Promise<void>) => Promise<void>,
): void => {
  const buildSchedule = (partial?: Partial<Schedule>): Schedule => {
    return new Schedule(
      partial?.monday ?? true,
      partial?.tuesday ?? true,
      partial?.wednesday ?? true,
      partial?.thursday ?? true,
      partial?.friday ?? true,
      partial?.saturday ?? true,
      partial?.sunday ?? true,
      partial?.hour ?? Hour._14,
    );
  };

  describe("getSchedule", () => {
    it("get existing", async () => {
      await setup(async (repo) => {
        const rosterId = RosterIdRandomizer.random();
        const schedule = buildSchedule();
        await repo.createSchedule(rosterId, schedule);

        const actual = await repo.getSchedule(rosterId);

        expect(actual?.equals(schedule)).toBeTruthy();
      });
    });

    it("not get non-existant", async () => {
      await setup(async (repo) => {
        const rosterId = RosterIdRandomizer.random();

        const actual = await repo.getSchedule(rosterId);

        expect(actual).toBeUndefined();
      });
    });
  });

  describe("createSchedule", () => {
    it("create", async () => {
      await setup(async (repo) => {
        const rosterId = RosterIdRandomizer.random();
        const schedule = buildSchedule();
        await repo.createSchedule(rosterId, schedule);

        const actual = await repo.getSchedule(rosterId);

        expect(actual?.equals(schedule)).toBeTruthy();
      });
    });
  });

  describe("deleteSchedule", () => {
    it("delete existing", async () => {
      await setup(async (repo) => {
        const rosterId = RosterIdRandomizer.random();
        const schedule = buildSchedule();
        await repo.createSchedule(rosterId, schedule);

        await repo.deleteSchedule(rosterId);
        const actual = await repo.getSchedule(rosterId);

        expect(actual?.equals(schedule)).toBeTruthy();
      });
    });
  });
};
