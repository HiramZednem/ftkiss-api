import { Router } from 'express';
import { DailyLogController } from '../controllers/dailyLog.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();
const dailyLogController = new DailyLogController();

router.post('/', verifyToken, dailyLogController.toggle.bind(dailyLogController));
router.get('/', verifyToken, dailyLogController.getAll.bind(dailyLogController));

export const dailyLogsRoutes = router;