import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_KEY } from '../config';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_KEY!);
        req.app.locals.id_user = (decoded as JwtPayload).id_user; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};