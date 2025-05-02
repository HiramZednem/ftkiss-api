import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';


const router = Router();
const habitController = new HabitController();

router.get('/:userId/', habitController.getAll.bind(habitController));
router.get(':userId/:habitId', habitController.get.bind(habitController));
router.post('/:userId', habitController.create.bind(habitController));
router.patch('/:userId/:habitId', habitController.update.bind(habitController));
router.delete('/:userId/:habitId', habitController.delete.bind(habitController));

export default router;