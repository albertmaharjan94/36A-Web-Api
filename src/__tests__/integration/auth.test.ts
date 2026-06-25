import request from "supertest";
import app from "../../app";
import { UserModel } from "../../models/user.model";

// top-level -> suite
describe(
    "Integration: Auth Routes", // name of suite,
    () => {
        beforeAll(
            async () => {
                await UserModel.deleteMany({}); // clear users collection before tests
            }
        );
        // same can be afterAll

        // group/nested
        describe(
            "POST /api/v1/auth/register", // name of group
            () => {
                test( 
                    "should validate user", // indiviual test 
                    async () => {
                        const res = await request(app)
                            .post("/api/v1/auth/register")
                            .send({
                                "firstName": "Mero",
                                "lastName": "Namm",
                            });
                        // expect -> to be 
                        expect(res.statusCode).toBe(400);
                        // can have multiple expectation
                        expect(res.body.success).toBe(false);
                    }
                );
            }
        );
    }
)