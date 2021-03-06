import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { ApiConstruct } from "./constructs/ApiConstruct";
import { DatabaseConstruct } from "./constructs/DatabaseConstruct";
import { OutputConstruct } from "./constructs/OutputConstruct";
import { TickerConstruct } from "./constructs/TickerConstruct";
import { WebConstruct } from "./constructs/WebConstruct";

export class RootStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const database = new DatabaseConstruct(this, "Database");

    const api = new ApiConstruct(this, "Api", {
      database,
    });

    new TickerConstruct(this, "Ticker", {
      database,
    });

    const web = new WebConstruct(this, "Web");

    new OutputConstruct(this, "WebUrl", {
      value: web.url,
    });

    new OutputConstruct(this, "ApiUrl", {
      value: api.api.url,
    });

    new OutputConstruct(this, "BucketName", {
      value: web.bucket.bucketName,
    });
  }
}
