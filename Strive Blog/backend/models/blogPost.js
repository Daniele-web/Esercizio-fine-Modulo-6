import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            minLength: 3,
            maxLength: 100,
            trim: true, 
        }
    }
);

const blogPostSchema = new Schema({
    category: String,
    title: String,
    cover: String,
    readTime: {
        value: Number,
        unit: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    
    content: String,
    comments: [commentSchema] 
}, {
    collection: 'blogPosts'
})

const BlogPost = model('BlogPost', blogPostSchema)

export default BlogPost;