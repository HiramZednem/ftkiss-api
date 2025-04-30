import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';


const router = Router();
const habitController = new HabitController();


router.post('/habit/:id', habitController.create.bind(habitController));
// router.post

router.get('/habits', (req, res) => {
    res.status(200).json({
        message: 'get all habits'
    });
}
);

export default router;