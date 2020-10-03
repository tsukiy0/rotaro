import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { DatabaseConstruct } from "./constructs/DatabaseConstruct";
import { OutputConstruct } from "./constructs/OutputConstruct";
import { WebConstruct } from "./constructs/WebConstruct";

export class RootStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new DatabaseConstruct(this, "Database");

    const web = new WebConstruct(this, "Web");

    new OutputConstruct(this, "WebUrl", {
      value: web.url,
    });
  }
}
