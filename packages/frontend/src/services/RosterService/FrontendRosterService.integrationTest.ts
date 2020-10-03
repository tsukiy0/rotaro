import {
  Roster,
  PersonIdRandomizer,
  RosterIdRandomizer,
  PersonRotation,
  PersonList,
  Person,
  PersonDays,
  Days,
  Schedule,
  Hour,
} from "@rotaro/core";
import { SystemConfig } from "@tsukiy0/tscore";
import fetch from "isomorphic-fetch";
import { FetchApiService, HttpError } from "../ApiService/FetchApiService";
import { FrontendRosterService } from "./FrontendRosterService";

describe("FrontendRosterService", () => {
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

  const setup = () => {
    const config = new SystemConfig();
    const baseUrl = config.get("API_URL");
    const apiService = new FetchApiService(fetch, baseUrl);

    return new FrontendRosterService(apiService);
  };

  describe("getRoster", () => {
    it("get existing", async () => {
      const roster = buildRoster();
      const service = setup();
      await service.createRoster(roster);

      const actual = await service.getRoster(roster.id);

      expect(actual.equals(roster)).toBeTruthy();
    });

    it("not get non-existant", async () => {
      const roster = buildRoster();
      const service = setup();

      await expect(service.getRoster(roster.id)).rejects.toThrowError(
        HttpError,
      );
    });
  });

  describe("createRoster", () => {
    it("create", async () => {
      const roster = buildRoster();
      const service = setup();

      await service.createRoster(roster);
      const actual = await service.getRoster(roster.id);

      expect(actual.equals(roster)).toBeTruthy();
    });
  });

  describe("deleteRoster", () => {
    it("delete existing", async () => {
      const roster = buildRoster();
      const service = setup();
      await service.createRoster(roster);

      await service.deleteRoster(roster.id);

      await expect(service.getRoster(roster.id)).rejects.toThrowError(
        HttpError,
      );
    });
  });
});
