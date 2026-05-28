import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";
import { authorizedMiddleware, adminMiddleware } from "../../middlewares/authorized.middleware";

const adminUserRouter = Router();
const adminUserController = new AdminUserController();

adminUserRouter.post(
    "/create",
    authorizedMiddleware,
    adminUserController.createUser
);
// rest of admin user routes

export default adminUserRouter;