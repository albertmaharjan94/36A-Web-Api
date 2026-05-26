import { UserMongoRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";
import { IUser } from "../models/user.model";
import { HttpException } from "../exceptions/http-exception";
import bycryptjs from "bcryptjs";
const userRepository = new UserMongoRepository();

export class UserService {
    async createUser(userData: CreateUserDTO): Promise<IUser> {
        // validation
        const existingEmail = await userRepository.getUserByEmail(userData.email);
        if (existingEmail) {
            throw new HttpException(400, "Email already exists");
        }
        const existingUsername = await userRepository.getUserByUsername(userData.username);
        if (existingUsername) {
            throw new HttpException(400, "Username already exists");
        }
        // hash password
        const hashedPassword = await bycryptjs.hash(userData.password, 10);
        userData.password = hashedPassword;
        const user = await userRepository.createUser(userData);
        return user;
    }
}