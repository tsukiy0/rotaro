import { RosterId, Schedule } from "@rotaro/core";

export interface ScheduleRepository {
  getSchedule(rosterId: RosterId): Promise<Schedule>;
  createSchedule(rosterId: RosterId, schedule: Schedule): Promise<void>;
  deleteSchedule(rosterId: RosterId): Promise<void>;
}
