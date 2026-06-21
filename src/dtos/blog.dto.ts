import { z } from "zod";
import { BlogSchema } from "../types/blog.type";

export const CreateBlogDTO = BlogSchema.pick(
    {
        title: true,
        content: true,
        authorId: true
    }
);
export type CreateBlogDTO = z.infer<typeof CreateBlogDTO>;