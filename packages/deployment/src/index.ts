import * as cdk from "@aws-cdk/core";
import { SystemConfig } from "@tsukiy0/tscore";
import { RootStack } from "./RootStack";

const config = new SystemConfig();

new RootStack(new cdk.App(), config.get("CFN_STACK_NAME"), {
  env: {
    account: config.get("CDK_DEFAULT_ACCOUNT"),
    region: config.get("CDK_DEFAULT_REGION"),
  },
});
