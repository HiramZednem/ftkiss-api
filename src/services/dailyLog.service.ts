import { prisma } from "../db/db";
import { DailyLogInput } from "../dtos/dailyLog/dailyLog";
import { HabitService } from "./habit.service";


export class DailyLogService {
  private habitService: HabitService;
  constructor() {
    this.habitService = new HabitService();
  }

  public async toggleLog(input: DailyLogInput, id_user: number) {
    const habit = await this.habitService.get(id_user, input.uuid_habit);

    if (!habit) {
      throw new Error("Habit not found");
    }

    const dailyLog = await this.getExistingLog(habit.id_habit, input.date);

    if (!dailyLog) {
      return prisma.daily_log.create({
        data: {
          id_habit: habit.id_habit,
          date: input.date,
          status: true,
        },
      });
    }

    return prisma.daily_log.update({
      where: {
        id_habit_date: {
          id_habit: habit.id_habit,
          date: input.date,
        },
      },
      data: {
        status: !dailyLog.status,
      },
    });
  }

  public async getExistingLog(id_habit: number, date: Date) {
    return prisma.daily_log.findUnique({
      where: {
        id_habit_date: {
          id_habit: id_habit,
          date: date,
        },
      },
    });
  }
}