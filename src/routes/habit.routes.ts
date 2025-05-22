import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';
import { DailyLogController } from '../controllers/dailyLog.controller';


const router = Router();
const habitController = new HabitController();
const dailyLogController = new DailyLogController();

router.get('/', habitController.getAll.bind(habitController));
router.get('/:habitUuid', habitController.get.bind(habitController));
router.post('/', habitController.create.bind(habitController));
router.patch('/:habitUuid', habitController.update.bind(habitController));
router.delete('/:habitUuid', habitController.delete.bind(habitController));


export const habitRoutes = router;