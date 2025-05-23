export interface DailyLogInput {
    uuid_habit: string;
    date: Date;
}
export interface DailyLogResponse {
    date: Date;
    status: boolean;
    habitName: string;
    habitUuid: string;

}