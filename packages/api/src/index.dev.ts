import { BackendRosterService } from "@rotaro/backend";
import { SystemConfig } from "@tsukiy0/tscore";
import { getApp } from "./app";

(async () => {
  const app = await getApp(async () => {
    const config = new SystemConfig();
    const dynamoUrl = config.get("DYNAMODB_URL");

    return {
      rosterService: await BackendRosterService.dev(dynamoUrl),
    };
  });
  app.listen(7000);
})();
