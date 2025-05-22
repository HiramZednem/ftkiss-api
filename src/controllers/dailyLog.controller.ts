import { Request, Response } from "express";
import { DailyLogService } from "../services/dailyLog.service";
import { BaseResponse } from '../dtos/BaseResponse';
import { dailyLogSchema } from "../dtos/dailyLog/dailySchema";
import { HabitService } from "../services/habit.service";

export class DailyLogController {
    private dailyLogService: DailyLogService;
    private habitService: HabitService;

    constructor() {
        this.dailyLogService = new DailyLogService();
        this.habitService = new HabitService();
    }

    public async toggle(req: Request, res: Response) {
        try {
            const result = dailyLogSchema.safeParse(req.body);

            if (!result.success) {
                res.status(400).json({ 
                    success: false, 
                    errors: result.error.format() 
                });
                return;
            }

            const toggled = await this.dailyLogService.toggleLog(result.data);

            res.status(200).json({ 
                success: true, data: toggled 
            });

        } catch (err: any) {
            console.error("Error toggling daily log by uuid:", err);
            res.status(500).json({ 
                success: false, 
                message: err.message 
            });
            return;
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const dailyLogs = await this.habitService.getAll(this.validateId(req.app.locals.id_user));
            if (!dailyLogs) {
                res.status(404).json({
                    success: false,
                    message: "No daily logs found"
                });
                return;
            }
            
            const response: BaseResponse = {
                success: true,
                data: dailyLogs,
                message: 'List of daily logs'
            }
            res.status(200).json(response);
        } catch(e: any) {
            console.error(e);
            res.status(500).json({ 
                success: false, 
                message: e.message 
            });
        }
    } 
    // FIXME: DRY - Este código se va a cambiar en el futuro.
    // Estamos manejando mal esta validación, pero se deja por ahora.
    private validateId(id: any): number {
        if (typeof id !== 'number') {
            throw new Error('Invalid user ID');
        }
        return id;
    }
}