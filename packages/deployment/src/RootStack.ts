import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { OutputConstruct } from "./constructs/OutputConstruct";
import { WebConstruct } from "./constructs/WebConstruct";

export class RootStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const web = new WebConstruct(this, "Web");

    new OutputConstruct(this, "WebUrl", {
      value: web.url,
    });
  }
}
