import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const app = (() => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post("/", (_, res) => {
    res.status(200);
    res.json({
      message: "hello world!",
    });
  });

  return app;
})();
