import { BlogService } from "../services/blog.service";
import { HttpException } from "../exceptions/http-exception";
import { CreateBlogDTO } from "../dtos/blog.dto";
import { z } from "zod";
import { Request, Response } from "express";
import { ApiResponseHelper } from "../utils/apihelper.util";
const blogService = new BlogService();
export class BlogController {
    async createBlog(req: Request, res: Response) {
        try{
            const userId = req.user?._id; // from authorizedMiddleware // imp
            if (!userId) {
                throw new HttpException(401, "Unauthorized");
            }
            req.body.authorId = String(userId); // set authorId from logged in user
            const blogData = CreateBlogDTO.safeParse(req.body);
            if (!blogData.success) {
                throw new HttpException(400, "Invalid blog data: " + blogData.error.message);
            }
            const blog = await blogService.createBlog(blogData.data);
            return ApiResponseHelper.success(res, blog, "Blog created successfully");
        }catch (error: Error | any) {
            return ApiResponseHelper
            .error(res, error.message || "Failed to create blog", error.status || 500);
        }
    }
    async getAuthorBlog(req: Request, res: Response) {
        try{
            const userId = req.user?._id; // from authorizedMiddleware // imp
            if (!userId) {
                throw new HttpException(401, "Unauthorized");
            }
            const blogs = await blogService.getAuthorBlog(String(userId));
            return ApiResponseHelper.success(res, blogs, "Blogs retrieved successfully");
        }catch (error: Error | any) {
            return ApiResponseHelper
            .error(res, error.message || "Failed to retrieve blogs", error.status || 500);
        }
    }
}