// eslint-disable-next-line import/no-unresolved
import { ScheduledHandler } from "aws-lambda";

export const handler: ScheduledHandler = async () => {
  console.log("hello");
};
