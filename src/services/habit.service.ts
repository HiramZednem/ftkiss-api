
import { prisma } from "../db/db";
import { HabitRequest } from "../dtos/habit/HabitRequest";


export class HabitService {

    constructor() {}

    public async getAll(id_user: number) {
        return await prisma.habits.findMany({where: {id_user: id_user}});
    }

    public async get(id_user: number, uuid_habit: string) {
        const habit = await prisma.habits.findFirst({where: {id_user: id_user, uuid: uuid_habit}});
        if(!habit) {
            throw new Error(`Habit with id: ${uuid_habit} not found`)
        }
        return habit;
    }

    public async create(habit: HabitRequest) {
      return await prisma.habits.create({data:  habit})
    }

    // actualizar
    public async update(id_user: number, uuid_habit: string, habit: HabitRequest) {
        const habitToUpdate = await this.get(id_user, uuid_habit);
        return await prisma.habits.update({where: {id_user: id_user, id_habit: habitToUpdate.id_habit}, data: habit});
    }

    // eliminar
    public async delete(id_user: number, uuid_habit: string) {
        const habitToDelete = await this.get(id_user, uuid_habit); 
        return await prisma.habits.delete({where: {id_user: id_user, id_habit: habitToDelete.id_habit}});
    }

}
