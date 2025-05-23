import { DailyLogResponse } from './dailyLog';


export const toDailyLogResponse = (log: any): DailyLogResponse => ({
    date: log.date,
    status: log.status,
    habitName: log.habit?.name,
    habitUuid: log.habit?.uuid,
});