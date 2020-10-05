import path from "path";
import { Construct, Duration } from "@aws-cdk/core";
import {
  Function as LambdaFunction,
  AssetCode,
  Runtime,
} from "@aws-cdk/aws-lambda";
import { RetentionDays } from "@aws-cdk/aws-logs";
import { Rule, Schedule } from "@aws-cdk/aws-events";
import * as Targets from "@aws-cdk/aws-events-targets";
import { DatabaseConstruct } from "./DatabaseConstruct";

export class TickerConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: {
      database: DatabaseConstruct;
    },
  ) {
    super(scope, id);

    const fn = new LambdaFunction(this, "Function", {
      code: new AssetCode(path.resolve(__dirname, "../../../ticker/out")),
      runtime: Runtime.NODEJS_12_X,
      handler: "index.handler",
      memorySize: 512,
      retryAttempts: 0,
      timeout: Duration.seconds(180),
      reservedConcurrentExecutions: 1,
      logRetention: RetentionDays.ONE_DAY,
      environment: {
        TABLE_NAME: props.database.table.tableName,
      },
    });
    props.database.table.grantReadWriteData(fn);

    new Rule(this, "Rule", {
      schedule: Schedule.cron({
        minute: "0",
        hour: "0-23",
      }),
      targets: [new Targets.LambdaFunction(fn)],
    });
  }
}
