import { UserModel, IUser } from "../models/user.model";

export interface IUserRepository {
    getUserById(id: string): Promise<IUser | null>;
    getUserByEmail(email: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    createUser(user: Partial<IUser>): Promise<IUser>;
}
export class UserMongoRepository implements IUserRepository {  
    async getUserById(id: string): Promise<IUser | null> {
        const found = await UserModel.findOne({ _id: id });
        return found;
    }
    async getUserByEmail(email: string): Promise<IUser | null> {
        const found = await UserModel.findOne({ email });
        return found;
    }
    async getUserByUsername(username: string): Promise<IUser | null> {
        const found = await UserModel.findOne({ username });
        return found;
    }
    async createUser(user: Partial<IUser>): Promise<IUser> {
        const created = await UserModel.create(user);
        return created;
    }
}