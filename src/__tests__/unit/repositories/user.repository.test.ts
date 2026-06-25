import { UserMongoRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../models/user.model";
describe(
    "Unit: UserMongoRepository", // name of suite,
    () => {
        let userRepository = new UserMongoRepository();
        beforeAll( async () => {
                await UserModel.deleteMany({}); // clear users collection before tests
            }
        );
        const userData = {
            firstName: "Mero",
            lastName: "namm",
            email: "mero@gmail.com",
            username: "meronamm",
            password: "password123",
        };
        test(
            "should create a user", // indiviual test
            async () => {
                const user = await userRepository.createUser(userData);
                expect(user).toBeDefined();
                expect(user).toHaveProperty("_id");
                expect(user.firstName).toBe(userData.firstName);
            }
        );
    }
);