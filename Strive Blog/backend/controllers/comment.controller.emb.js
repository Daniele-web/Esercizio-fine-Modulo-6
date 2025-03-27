import BlogPost from "../models/blogPost.js";

export const readAllComments = async (req, res) => {
    try {
        const blogPost = BlogPost.findById(req.params.id)

        return res.send(blogPost.comments)
    }
    catch {
        return res.status(500).send()
    }
}

export const readOneComment = async (req, res) => {
    try {
        const selectedBlogPost = await BlogPost.findById(req.params.id)
        // console.log(selectedBlogPost)

        const comment = selectedBlogPost.comments.id(req.params.commentId)

        return res.send(comment)
    }
    catch {
        return res.status(500).send()
    }
}

export const createOneComment = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)

        const selectedBlogPost = await BlogPost.findById(req.params.id)
        console.log(selectedBlogPost)

        selectedBlogPost.comments.push(req.body)
        await selectedBlogPost.save()

        return res.status(201).send({
            data: selectedBlogPost
        })
    }
    catch {
        return res.status(500).send()
    }
}

export const editOneComment = async (req, res) => {
    try {
        const selectedBlogPost = await BlogPost.findById(req.params.id)
        //console.log(selectedBlogPost)

        const oldComment = await selectedBlogPost.comments.id(req.params.commentId)
        console.log(oldComment)
        oldComment.content = req.body.content

        const updatedComment = await selectedBlogPost.save()

        return res.send({
            data: updatedComment
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'errore nella modifica' })
    }
}

export const deleteOneComment = async (req, res) => {
    try {
        const selectedBlogPost = await BlogPost.findById(req.params.id);
        const commentToDelete = selectedBlogPost.comments.id(req.params.commentId);

        commentToDelete.deleteOne();

        const updatedBlogPost= await selectedBlogPost.save();

        res.send({
            data: updatedBlogPost
        });
    }

    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore nella modifica' })
    }
}