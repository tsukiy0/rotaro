import { BackendRosterService, TickerService } from "@rotaro/backend";
import { SystemConfig } from "@tsukiy0/tscore";
// eslint-disable-next-line import/no-unresolved
import { ScheduledHandler } from "aws-lambda";

export const handler: ScheduledHandler = async () => {
  const config = new SystemConfig();
  const tableName = config.get("TABLE_NAME");

  const rosterService = BackendRosterService.prod(tableName);
  const tickerService = TickerService.default(rosterService);

  await tickerService.tickAllForNow();
};
