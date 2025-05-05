import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';


const router = Router();
const habitController = new HabitController();

router.get('/', habitController.getAll.bind(habitController));
router.get('/:habitId', habitController.get.bind(habitController));
router.post('/', habitController.create.bind(habitController));
router.patch('/:habitId', habitController.update.bind(habitController));
router.delete('/:habitId', habitController.delete.bind(habitController));

export default router;