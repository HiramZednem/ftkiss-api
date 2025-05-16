import { Request, Response } from "express";
import { HabitLogService } from "../services/check.service";

export class HabitLogController {
static async upsert(req: Request, res: Response) {
    try {
    const { id_habit, date, status } = req.body;

    if (!id_habit || !date || typeof status !== "boolean") {
        return res.status(400).json({ message: "Datos inválidos: se requiere id_habit, date y status (boolean)" });
    }

    const log = await HabitLogService.upsertDailyLog(id_habit, date, status);

    return res.status(200).json({
        message: "Registro de hábito actualizado correctamente",
        data: log,
    });

    } catch (error) {
    console.error("Error al guardar hábito diario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
}
}
