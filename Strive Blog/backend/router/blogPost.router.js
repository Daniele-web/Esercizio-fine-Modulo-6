import express from 'express';
import BlogPost from '../models/blogPost.js';
import * as blogPostsController from '../controllers/blogPosts.controller.js';
import { uploadCloudinaryCover } from '../middlewares/uploadCloudinary.js';
import * as commentController from '../controllers/comment.controller.emb.js'
//import * as commentController from '../controllers/comment.controller.ref.js';


const blogPostRouter = express.Router();

blogPostRouter.get("/", blogPostsController.readAll);

blogPostRouter.get("/:id", blogPostsController.readOne);

blogPostRouter.post("/", uploadCloudinaryCover.single('cover'), blogPostsController.createOne);

blogPostRouter.put("/:id", blogPostsController.editOne);

blogPostRouter.delete("/:id", blogPostsController.deleteOne)

blogPostRouter.patch('/:blogPostId/cover/', uploadCloudinaryCover.single('cover'), blogPostsController.patchCover )

export default blogPostRouter;