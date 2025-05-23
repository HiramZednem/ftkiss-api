import { Request, Response } from "express";
import { HabitSchema } from "../dtos/habit/HabitSchema";
import { HabitService } from "../services/habit.service";
import { BaseResponse } from '../dtos/BaseResponse';
import { HabitRequest } from "../dtos/habit/HabitRequest";
import { validate as uuidValidate } from 'uuid';

// TODO: add as habitResponse
export class HabitController {
    private habitService: HabitService;
    
    constructor() {
        this.habitService = new HabitService();
    }

    public async getAll (req: Request, res: Response) {
        try {
            const habits = await this.habitService.getAll(this.validateId(req.app.locals.id_user));

            const response: BaseResponse = {
                success: true,
                data: habits,
                message: 'List of habits'
            }
            res.status(201).json(response);
        } catch(e: any) {
            console.error(e);
            res.status(500).json({ success: false, message: e.message });
        }
    } 

    // TODO: add statistics
    public async get(req: Request, res: Response) {
        
        try {
            const uuid = req.params.habitUuid;
            this.validateHabitUuid(uuid, res);

            const habit = await this.habitService.get(this.validateId(req.app.locals.id_user), uuid);
            const response: BaseResponse = {
                success: true,
                data: habit, 
                message: `habit with id: ${uuid}, returned succesfully`
            }
            res.status(200).json(response);
        } catch (e: any) {
            console.error(e);
            res.status(500).json({ success: false, message: e.message });
        }
    }

    public async create (req: Request, res: Response) {
        const parse = HabitSchema.safeParse(req.body);
        if (!parse.success) {
            res.status(400).json({ errors: parse.error.flatten().fieldErrors });
        }

        try {
            const habitCreated = await this.habitService.create({id_user: this.validateId(req.app.locals.id_user), ...parse.data} as HabitRequest);

            const response: BaseResponse = {
                success: true,
                data: habitCreated,
                message: 'Habit created successfully'
            }

            res.status(201).json(response);
        } catch(e: any) {
           console.error(e);
            res.status(500).json({ success: false, message: e.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const uuid = req.params.habitUuid;
            this.validateHabitUuid(uuid, res);
        
            const parse = HabitSchema.safeParse(req.body);
            if (!parse.success) {
                res.status(400).json({ errors: parse.error.flatten().fieldErrors });
            }
    
            const updatedHabit = await this.habitService.update(this.validateId(req.app.locals.id_user), req.params.habitId, parse.data as HabitRequest);
            const response: BaseResponse = {
                success: true,
                data: updatedHabit,
                message: `Habit with id: ${req.params.habitUuid} updated succesfully`  
            }

            res.status(201).json(response);
        } catch(e: any)  {
            console.error(e)
            res.status(500).json({ success: false, message: e.message });
        }
    }

    public async delete(req: Request, res: Response) {
        
        try {
            const uuid = req.params.habitUuid;
            this.validateHabitUuid(uuid, res);

            this.habitService.delete(this.validateId(req.app.locals.id_user) , req.params.habitId);
            const response: BaseResponse =  {
                success: true,
                message: `Habit with id: ${req.params.habitUuid}} deleted succesfully`          
            };
            res.status(200).json(response);
        } catch ( e: any ) {
            console.error(e); 
            res.status(500).json({ success: false, message: e.message });
        }
    }

    private validateId(id: string) {
        if (!id || isNaN(Number(id))) {
            throw Error("invalid user id");
        } 
        return Number(id);
    } 

    private validateHabitUuid(uuid: string, res: Response) {
        if (!uuid || !uuidValidate(uuid)) {
            throw Error('Habit uuid is invalid or null');
        }
    }
}