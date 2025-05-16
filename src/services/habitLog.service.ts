import { prisma } from "../db/db";
import { HabitLogInput } from "../dtos/habitLog/habitLog";

export class HabitLogService {

    constructor() {}

    public async upsertDailyLog(habitLog: HabitLogInput) {
        return prisma.daily_log.upsert({
        where: {
            id_habit_date: { id_habit: Number(habitLog.id_habit), date: new Date(habitLog.date) }
        },
        update: { status: habitLog.status },
        create: {
            id_habit: Number(habitLog.id_habit),
            date: new Date(habitLog.date),
            status: habitLog.status
        }
        });
    }

    public async getAllLogsByUser(userId: number) {
        return prisma.habits.findMany({
            where: { id_user: userId },
            select: {
            id_habit: true,
            name: true,
            daily_log: {
                select: {
                date: true,
                status: true,
                },
            },
            },
        });
    }


}


