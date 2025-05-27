import { Request, Response } from "express";
import { UserSchema } from "../dtos/user/UserSchema";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginSchema } from "../dtos/user/LoginSchema";
import { JWT_KEY } from "../config";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async create(req: Request, res: Response) {
        try {
            const parse = UserSchema.safeParse(req.body);
            if(!parse.success) {
                res.status(400).json({ errors: parse.error.flatten().fieldErrors })
                return;
            }

            const hashedPassword = await bcrypt.hash(parse.data.password, 10);
            const user = await this.userService.create({ ...parse.data, password: hashedPassword });
            const response = {
                success: true,
                data: user,
                message: 'User created successfully'
            }
            res.status(201).json(response);
        } catch (e: any) {
            console.error(e)
            res.status(500).json({success: false, error: e.message})
        }
    }

    public async login(req: Request, res: Response) {
        const parse = LoginSchema.safeParse(req.body);

        if(!parse.success) {
            res.status(400).json({ errors: parse.error.flatten().fieldErrors })
            return;
        }

        const user = await this.userService.findByEmail(parse.data.email);
        if (!user) {
            res.status(401).json({ error: 'Authentication failed' });
            return;
        }

        const passwordMatch = bcrypt.compare(parse.data.password, user.password!);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Authentication failed' });
            return;
        }

        const token = jwt.sign({ id_user: user.id_user}, JWT_KEY!, {
            expiresIn: '1h',
        });
        // TODO: agregar datos del usuario...
        res.status(200).json({ token });
    }
}