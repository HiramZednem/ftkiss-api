import { Request, Response } from "express";
import { UserSchema } from "../dtos/user/UserSchema";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt';

// TODO: jwt and login
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
}