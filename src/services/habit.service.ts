
import { prisma } from "../db/db";
import { HabitRequest } from "../dtos/habit/HabitRequest";


export class HabitService {

    constructor() {}

    public async create(habit: HabitRequest) {
      return await prisma.habits.create({data:  habit})
    }
}
