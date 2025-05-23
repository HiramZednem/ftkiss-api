import { prisma } from "../db/db";
import { UserRequest } from "../dtos/user/UserSchema";


export class UserService {
    constructor(){}

    public async create(user: UserRequest) {
        const existingUser = await prisma.users.findUnique({
            where: { email: user.email },
        });
      
        if (existingUser) {
            throw new Error('Email already registered');
        }
        return await prisma.users.create({data: user})
    }

    public async findByEmail(email: string) {
        return await prisma.users.findUnique({
            where: {
                email: email
            } 
        })
    }
}