import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";

const router = Router();
const blogController = new BlogController();

router.post(
    "/",
    authorizedMiddleware, // only logged in users can create blogs -> req.user
    blogController.createBlog
);
router.get(
    "/my-blogs",
    authorizedMiddleware, // only logged in users can view their blogs -> req.user
    blogController.getAuthorBlog
);

export default router;