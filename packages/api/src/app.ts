import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { SystemConfig } from "@tsukiy0/tscore";
import { BackendRosterService } from "@rotaro/backend";
import {
  RosterIdSerializer,
  RosterSerializer,
  RosterService,
} from "@rotaro/core";

let services: {
  rosterService: RosterService;
} = undefined as any;

const setup = async (): Promise<void> => {
  const config = new SystemConfig();
  const dynamoUrl = config.get("DYNAMODB_URL");

  if (!services) {
    services = {
      // @TODO decide dev and prod for each service
      rosterService: await BackendRosterService.dev(dynamoUrl),
    };
  }
};

export const app = ((): Express => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post("/", (_, res) => {
    res.status(200);
    res.json({
      message: "hello world!",
    });
  });

  app.post("/createRoster", async (req, res) => {
    try {
      await setup();
      const input = RosterSerializer.deserialize(req.body);
      await services.rosterService.createRoster(input);
      res.status(200);
      res.json({});
    } catch (e) {
      res.status(500);
      res.json({
        message: e.message,
      });
    }
  });

  app.post("/getRoster", async (req, res) => {
    try {
      await setup();
      const input = RosterIdSerializer.deserialize(req.body);
      const output = await services.rosterService.getRoster(input);
      res.status(200);
      res.json(RosterSerializer.serialize(output));
    } catch (e) {
      res.status(500);
      res.json({
        message: e.message,
      });
    }
  });

  app.post("/deleteRoster", async (req, res) => {
    try {
      await setup();
      const input = RosterIdSerializer.deserialize(req.body);
      await services.rosterService.deleteRoster(input);
      res.status(200);
      res.json({});
    } catch (e) {
      res.status(500);
      res.json({
        message: e.message,
      });
    }
  });

  return app;
})();
