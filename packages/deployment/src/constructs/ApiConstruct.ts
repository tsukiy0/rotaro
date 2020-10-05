import path from "path";
import {
  Function as LambdaFunction,
  AssetCode,
  Runtime,
} from "@aws-cdk/aws-lambda";
import { Construct, Duration } from "@aws-cdk/core";
import { Cors, LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { RetentionDays } from "@aws-cdk/aws-logs";
import { DatabaseConstruct } from "./DatabaseConstruct";

export class ApiConstruct extends Construct {
  public readonly api: LambdaRestApi;

  constructor(
    scope: Construct,
    id: string,
    props: {
      database: DatabaseConstruct;
    },
  ) {
    super(scope, id);

    const fn = new LambdaFunction(this, "Function", {
      code: new AssetCode(path.resolve(__dirname, "../../../api/out")),
      runtime: Runtime.NODEJS_12_X,
      handler: "index.handler",
      memorySize: 512,
      retryAttempts: 0,
      timeout: Duration.seconds(30),
      reservedConcurrentExecutions: 20,
      logRetention: RetentionDays.ONE_DAY,
      environment: {
        TABLE_NAME: props.database.table.tableName,
      },
    });
    props.database.table.grantReadWriteData(fn);

    const api = new LambdaRestApi(this, "Api", {
      handler: fn,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    this.api = api;
  }
}
