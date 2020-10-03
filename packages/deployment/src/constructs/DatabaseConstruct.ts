import { Construct } from "@aws-cdk/core";
import {
  Table,
  BillingMode,
  Attribute,
  AttributeType,
  ProjectionType,
} from "@aws-cdk/aws-dynamodb";

export class DatabaseConstruct extends Construct {
  public readonly table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const idAttribute: Attribute = {
      name: "id",
      type: AttributeType.STRING,
    };

    const scheduleHourAttribute: Attribute = {
      name: "scheduleHour",
      type: AttributeType.STRING,
    };

    const table = new Table(this, "Table", {
      partitionKey: idAttribute,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    table.addGlobalSecondaryIndex({
      indexName: "scheduleHour_id",
      partitionKey: scheduleHourAttribute,
      sortKey: idAttribute,
      projectionType: ProjectionType.ALL,
    });

    this.table = table;
  }
}
