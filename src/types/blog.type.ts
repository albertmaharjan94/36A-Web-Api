import { z } from "zod";

export const BlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    authorId: z.string().min(1, "Author ID is required"),
});

export type BlogType = z.infer<typeof BlogSchema>;