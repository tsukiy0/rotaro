import { Stack, Construct, StackProps } from "@aws-cdk/core";

export class RootStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
  }
}
