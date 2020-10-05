import { BackendRosterService, TickerService } from "@rotaro/backend";
import { SystemConfig } from "@tsukiy0/tscore";
// eslint-disable-next-line import/no-unresolved
import { ScheduledHandler } from "aws-lambda";

export const handler: ScheduledHandler = async () => {
  const config = new SystemConfig();
  const dynamoUrl = config.get("DYNAMODB_URL");

  const rosterService = BackendRosterService.prod(dynamoUrl);
  const tickerService = TickerService.default(rosterService);

  await tickerService.tickAllForNow();
};
