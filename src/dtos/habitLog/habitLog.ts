export interface HabitLogInput {
    id_habit: number;
    date: string;
    status: boolean;
}

export interface HabitLogDeleteInput {
    id_habit: number;
    date: string;
}
