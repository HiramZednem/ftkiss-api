import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';
import { HabitLogController } from '../controllers/habitLog.controller';


const router = Router();
const habitController = new HabitController();
const habitLogController = new HabitLogController();

router.get('/', habitController.getAll.bind(habitController));
router.get('/:habitUuid', habitController.get.bind(habitController));
router.post('/', habitController.create.bind(habitController));
router.patch('/:habitUuid', habitController.update.bind(habitController));
router.delete('/:habitUuid', habitController.delete.bind(habitController));

// Habit Log Routes
router.post('/log', habitLogController.upsert.bind(habitLogController));

export default router;