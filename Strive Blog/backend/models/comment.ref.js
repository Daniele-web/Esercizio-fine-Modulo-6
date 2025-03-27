import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            trim: true
        },
        blogPost: {
            type: Schema.Types.ObjectId,
            ref: 'BlogPost'
        },
    },
    {
        collection: 'comments',
        trimestamps: true
    }
);

const Comment = model('Comment', commentSchema)

export default Comment;