import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  ErrorSerializerMap,
  RosterIdSerializer,
  RosterSerializer,
  RosterService,
} from "@rotaro/core";

const errHandler = (err: Error, res: any) => {
  const serializer = ErrorSerializerMap.fromInstance(err);

  if (!serializer) {
    res.status(500);
    res.json({});
  } else {
    res.status(400);
    res.json(serializer.serialize(err));
  }
};

export const getApp = async (
  setup: () => Promise<{
    rosterService: RosterService;
  }>,
): Promise<Express> => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const services = await setup();

  app.post("/createRoster", async (req, res) => {
    try {
      await setup();
      const input = RosterSerializer.deserialize(req.body);
      await services.rosterService.createRoster(input);
      res.status(200);
      res.json({});
    } catch (e) {
      errHandler(e, res);
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
      errHandler(e, res);
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
      errHandler(e, res);
    }
  });

  return app;
};
