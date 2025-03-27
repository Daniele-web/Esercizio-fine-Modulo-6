import BlogPost from '../models/blogPost.js';
import 'dotenv/config';
import transport from '../services/mail.service.js'
import Author from '../models/author.js'
import * as path from 'path';

export const readAll = async (req, res) => {
    const page = req.query.page || 1
    const perPage = req.query.perPage || 12

    const blogPosts = await BlogPost.find({})
        .sort({ data: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate('author')

    // const totalPages = await BlogPost.aggregate([])

    const totalResults = await BlogPost.countDocuments() 
    const totalPages = Math.ceil(totalResults / perPage)

    res.send({
        dati: blogPosts,
        totalPages,
        totalResults
    })
}

export const readOne = async (req, res) => {
    const id = req.params.id

    try {
        const blogPost = await BlogPost
            .findById(id)
            .populate('author')

        res.send(blogPost)
    }

    catch (error) {
        console.log(error)
        res.status(404).send({ message: 'Non trovato' })
    }

}

export const createOne = async (req, res) => {
    const blogPostData = req.body

    console.log('prima il path')

    const newBlogPost = new BlogPost({ ...blogPostData, cover: req.file.path, readTime: JSON.parse(req.body.readTime) })

    console.log('dopo il path')

    try {
        const createdBlogPost = await newBlogPost.save()

        res.status(201).send(createdBlogPost)

        const author = await Author.findById(createdBlogPost.author)
         await transport.sendMail(
            {
                from: 'noreply@striveblog.com', 
                to: author.email, 
                subject: 'Benvenuto su Strive Blog', 
                text: `Benvenuto ${createdBlogPost.author}`, 
                html: `<b>Benvenuto ${createdBlogPost.author}</b>`, 
            }
        )
    }

    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'qualcosa non va' })
    }

}

export const editOne = async (req, res) => {
    const id = req.params.id
    const blogPostData = req.body

    try {
        await BlogPost.findByIdAndUpdate(id, blogPostData)
        const blogPost = await BlogPost.findById(id)
        res.send(blogPost)
    }

    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore nella modifica' })
    }
}

export const deleteOne = async (req, res) => {
    const id = req.params.id

    try {
        console.log(BlogPost.findById(id))
        await BlogPost.findByIdAndDelete(id)

        res.send({ message: 'eliminato' })
    }

    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore nella modifica' })
    }
}

export const patchCover = async (req, res) => {
    const id = req.params.blogPostId

    try {
        const blogPost = await BlogPost.findByIdAndUpdate(id, { cover: req.file.path })
        // await blogPost.save()

        res.status(200).send(blogPost)
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore patch avatar' })
    }
};
