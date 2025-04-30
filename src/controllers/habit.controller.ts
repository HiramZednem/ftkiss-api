import { Request, Response } from "express";
import { HabitSchema } from "../dtos/habit/HabitSchema";
import { HabitService } from "../services/habit.service";
import { BaseResponse } from "../dtos/BaseResponse";
import { HabitRequest } from "../dtos/habit/HabitRequest";


export class HabitController {
    private habitService: HabitService;
    
    constructor() {
        this.habitService = new HabitService();
    }

    public async create (req: Request, res: Response) {
        const parse = HabitSchema.safeParse(req.body);
        if (!parse.success) {
            res.status(400).json({ errors: parse.error.flatten().fieldErrors });
        }

        const idParam = req.params.id;
        if (!idParam || isNaN(Number(idParam))) {
            const response: BaseResponse = {
                success: false,
                message: 'The user id is not valid'
            }
            res.status(400).json(response);
        }


        // validar con el servicio de usuarios cuando este, que el usuario exista


        try {
            const habitCreated = await this.habitService.create({id_user: Number(idParam), ...parse.data} as HabitRequest);

            const response: BaseResponse = {
                success: true,
                data: habitCreated,
                message: 'Habit created successfully'
            }

            res.status(201).json(response);
        } catch(e: unknown) {
            console.error(e);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}