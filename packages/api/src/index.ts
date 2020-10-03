// eslint-disable-next-line import/no-unresolved
import { APIGatewayProxyHandler } from "aws-lambda";
import { createServer, proxy } from "aws-serverless-express";
import { app } from "./app";

export const handler: APIGatewayProxyHandler = (event, context) => {
  const server = createServer(app);
  proxy(server, event, context);
};
