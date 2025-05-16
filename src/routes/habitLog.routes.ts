import { Router } from 'express';
import { HabitLogController } from '../controllers/habitLog.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();
const habitLogController = new HabitLogController();

router.post('/', verifyToken, habitLogController.upsert.bind(habitLogController));

export default router;
