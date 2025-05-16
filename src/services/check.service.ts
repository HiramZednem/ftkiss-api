import { prisma } from "../db/db";

export class HabitLogService {
public static async upsertDailyLog(id_habit: number, date: string, status: boolean) {
    return prisma.daily_log.upsert({
    where: {
        id_habit_date: { id_habit, date: new Date(date) }
    },
    update: { status },
    create: {
        id_habit,
        date: new Date(date),
        status
    }
    });
}
}
