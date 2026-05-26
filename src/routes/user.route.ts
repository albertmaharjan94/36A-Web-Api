import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", userController.createUser);

export default userRouter;