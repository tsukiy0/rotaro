import { dayFromDateTime, hourFromDateTime, RosterId } from "@rotaro/core";
import { BaseError, Clock, SystemClock } from "@tsukiy0/tscore";
import { BackendRosterService } from "../RosterService/BackendRosterService";

export class BadDateTimeDayError extends BaseError {}

export class TickerService {
  constructor(
    private readonly rosterService: BackendRosterService,
    private readonly clock: Clock,
  ) {}

  public static readonly default = (
    rosterService: BackendRosterService,
  ): TickerService => {
    return new TickerService(rosterService, new SystemClock());
  };

  public readonly tickAllForNow = async (): Promise<void> => {
    const now = this.clock.now();

    const day = dayFromDateTime(now);
    const hour = hourFromDateTime(now);

    const rosters = await this.rosterService.listRostersByDayAndHour(day, hour);

    // @TODO this could cause DynamoDB to throttle
    // better move this to a queue
    await Promise.all(
      rosters.map(async (_) => {
        await this.rosterService.tickRoster(_.id);
      }),
    );
  };
}
