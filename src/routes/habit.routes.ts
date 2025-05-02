import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';


const router = Router();
const habitController = new HabitController();

router.get('/habit/:userId/', habitController.getAll.bind(habitController));
router.get('/habit/:userId/:habitId', habitController.get.bind(habitController));
router.post('/habit/:userId', habitController.create.bind(habitController));
router.patch('/habit/:userId/:habitId', habitController.update.bind(habitController));
router.delete('/habit/:userId/:habitId', habitController.delete.bind(habitController));

export default router;