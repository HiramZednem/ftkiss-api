
import { prisma } from "../db/db";
import { HabitRequest } from "../dtos/habit/HabitRequest";


export class HabitService {

    constructor() {}

    // obtener todos
    public async getAll(id_user: number) {
        return await prisma.habits.findMany({where: {id_user: id_user}});
    }

    // obtener uno  (Esta a futuro estara enfocado en las estadisticas...)
    public async get(id_user: number, id_habit: number) {
        return await prisma.habits.findMany({where: {id_user: id_user, id_habit: id_habit}});
    }

    public async create(habit: HabitRequest) {
      return await prisma.habits.create({data:  habit})
    }

    // actualizar
    public async update(id_user: number, id_habit: number, habit: HabitRequest) {
        return await prisma.habits.update({where: {id_user: id_user, id_habit: id_habit}, data: habit});
    }

    // eliminar
    public async delete(id_user: number, id_habit: number) {
        return await prisma.habits.delete({where: {id_user: id_user, id_habit: id_habit}});
    }


}
