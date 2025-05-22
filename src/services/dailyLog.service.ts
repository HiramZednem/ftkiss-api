import { prisma } from "../db/db";
import { DailyLogInput } from "../dtos/dailyLog/dailyLog";

export class DailyLogService {
  constructor() {}

  public async toggleLog(input: DailyLogInput) {
    const habit = await prisma.habits.findUnique({
      where: { uuid: input.uuid_habit },
    });

    if (!habit) {
      throw new Error("Habit not found");
    }
    const parsedDate = new Date(input.date);

    const existingLog = await prisma.daily_log.findUnique({
      where: {
        id_habit_date: {
          id_habit: habit.id_habit,
          date: parsedDate,
        },
      },
    });

    if (!existingLog) {
      return prisma.daily_log.create({
        data: {
          id_habit: habit.id_habit,
          date: parsedDate,
          status: true,
        },
      });
    }

    return prisma.daily_log.update({
      where: {
        id_habit_date: {
          id_habit: habit.id_habit,
          date: parsedDate,
        },
      },
      data: {
        status: !existingLog.status,
      },
    });
  }
}