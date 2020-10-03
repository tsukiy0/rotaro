import { BackendRosterService } from "@rotaro/backend";
import { SystemConfig } from "@tsukiy0/tscore";
// eslint-disable-next-line import/no-unresolved
import { APIGatewayProxyHandler } from "aws-lambda";
import { createServer, proxy } from "aws-serverless-express";
import { getApp } from "./app";

export const handler: APIGatewayProxyHandler = (event, context) => {
  (async () => {
    const app = await getApp(async () => {
      const config = new SystemConfig();
      const dynamoUrl = config.get("DYNAMODB_URL");

      return {
        rosterService: BackendRosterService.prod(dynamoUrl),
      };
    });
    const server = createServer(app);
    proxy(server, event, context);
  })();
};
