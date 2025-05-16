import { Request, Response } from "express";
import { HabitLogService } from "../services/habitLog.service";
import { BaseResponse } from '../dtos/BaseResponse';
import { dailyLogSchema } from "../dtos/habitLog/habitSchema";
import { HabitService } from "../services/habit.service";

export class HabitLogController {
    private habitLogService: HabitLogService;
    private habitService: HabitService;

    constructor() {
        this.habitLogService = new HabitLogService();
        this.habitService = new HabitService();
    }

    public async upsert(req: Request, res: Response) {
        try {
            const validatedLog = dailyLogSchema.safeParse(req.body);

            if (!validatedLog.success) {
                res.status(400).json({
                    message: "Invalid data",
                    errors: validatedLog.error.errors,
                });
                return;
            }

            const habit = await this.habitService.getHabitById(validatedLog.data.id_habit);
            if (!habit) {
                res.status(404).json({ 
                    success: false,
                    message: "Habit not found" 
                });
                return;
            }
            
            const log = await this.habitLogService.upsertDailyLog(validatedLog.data);

            const response: BaseResponse = {
                success: true,
                data: log,
                message: "Habit log updated successfully",
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Error updating habit log:", error);
            res.status(500).json({ 
                success: false,
                message: "Internal server error" 
            });
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const habitLogs = await this.habitLogService.getAllLogsByUser(this.validateId(req.app.locals.id_user));
            if (!habitLogs) {
                res.status(404).json({ 
                    success: false,
                    message: "No habit logs found" 
                });
                return;
            }
            
            const response: BaseResponse = {
                success: true,
                data: habitLogs,
                message: 'List of habit logs'
            }
            res.status(200).json(response);
        } catch(e: any) {
            console.error(e);
            res.status(500).json({ success: false, message: e.message });
        }
    } 

    private validateId(id: any): number {
        if (typeof id !== 'number') {
            throw new Error('Invalid user ID');
        }
        return id;
    }
}
