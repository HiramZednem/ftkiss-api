import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post('/', userController.create.bind(userController));

router.post('/login', (req, res) => {
    res.status(200).json({
        message: 'user logged in'
    });
}
);






export default router;