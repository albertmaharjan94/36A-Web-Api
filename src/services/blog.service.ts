import { CreateBlogDTO } from "../dtos/blog.dto";
import { BlogMongoRepository } from "../repositories/blog.repository";
import { HttpException } from "../exceptions/http-exception";
const blogRepository = new BlogMongoRepository();
export class BlogService {
    async createBlog(blogData: CreateBlogDTO) {
        const blog = await blogRepository.createBlog(blogData);
        if (!blog) {
            throw new HttpException(500, "Failed to create blog");
        }
        return blog;
    }
    async getAuthorBlog(id: string) {
        const blogs = await blogRepository.getAuthorBlog(id);
        if (!blogs) {
            throw new HttpException(404, "No blogs found for this author");
        }
        return blogs;
    }
}