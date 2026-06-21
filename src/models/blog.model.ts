import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import { BlogType } from "../types/blog.type";

export interface BlogDocument extends Omit<BlogType, "authorId">, Document {
    authorId: ObjectId | string; // omit authorId to define as ObjectId
}
export const BlogSchema = new Schema<BlogDocument>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // reference
    // relation to User model
}, {
    timestamps: true,
});
export const BlogModel: Model<BlogDocument> 
    = mongoose.model<BlogDocument>("Blog", BlogSchema);