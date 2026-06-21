import { BlogModel } from "../models/blog.model";
import { BlogType } from "../types/blog.type";

export interface IBlogRepository{
    createBlog(blogData: BlogType);
    getAuthorBlog(id: string);
}

export class BlogMongoRepository implements IBlogRepository{
    async createBlog(blogData:  BlogType){
        const newBlog = await BlogModel.create(blogData);
        return newBlog;
    }
    async getAuthorBlog(id: string){
        const blogs = await BlogModel
            .find({ authorId: id })
            .populate("authorId", "username email firstName");
        return blogs;
    }
}