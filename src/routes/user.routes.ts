import { Router } from "express";

const router = Router();

router.post('/create', (req, res) => {
    res.status(200).json({
        message: 'user created'
    });
});

router.post('/login', (req, res) => {
    res.status(200).json({
        message: 'user logged in'
    });
}
);






export default router;