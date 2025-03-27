import Author from '../models/author.js';
import 'dotenv/config';
import transport from '../services/mail.service.js';
import bcrypt from 'bcrypt';

export const readMultiple = async (req, res) => {
    const page = req.query.page || 1
    const perPage = req.query.perPage || 3

    const authors = await Author.find({})
        .sort({ data: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)

    // const totalPages = await Author.aggregate([])
    const totalResults = await Author.countDocuments() 
    const totalPages = Math.ceil(totalResults / perPage)

    res.send({
        dati: authors, 
        totalPages,
        totalResults 
    })
};

export const readOne = async (req, res) => {
    const id = req.params.id
    try {
        const author = await Author.findById(id)
        res.send(author)
    }
    catch (error) {
        console.log(error)
        res.status(404).send({ message: 'Non trovato' })
    }
};


/*
    export const createOne = async (req, res) => {
        const authorData = req.body
        authorData.avatar = `${process.env.HOST}:${process.env.PORT}/uploads/${req.filename}`
        const newAuthor = new Author(authorData)
        try {
            const createdAuthor = await newAuthor.save()

            res.status(201).send(createdAuthor)
        }
        catch (error) {
            console.log(error)
            res.status(400).send({ message: ' c'è qualcosa che non va' ' })
        }
    } 
*/

export const createOne = async (req, res) => {
    const authorData = req.body


    const author = await Author.findOne({ email: req.body.email });

    author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40"

    if (author) return res.status(500).send('Mail già in uso');

    const newAuthor = new Author({
        ...authorData,
        avatar: req.file.path,
        password: await bcrypt.hash(req.body.password, 10)
    });
    
    const createdAuthor = await newAuthor.save()

    try {
        res.status(201).send(createdAuthor)

        await transport.sendMail(
            {
                from: 'noreply@striveblog.com', 
                to: createdAuthor.email, 
                subject: 'Benvenuto su Strive Blog', 
                text: `Benvenuto ${createdAuthor.nome}`, 
                html: `<b>Benvenuto ${createdAuthor.cognome}</b>`, 
            }
        )
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'qualcosa non va' })
    }
};

/* export const createOne = async (req, res) => {
    return res.send(req.file)
} */

export const editOne = async (req, res) => {
    const id = req.params.id
    const authorData = req.body
    try {
        await Author.findByIdAndUpdate(id, authorData)
        const author = await Author.findById(id)

        await author.save()

        res.send(author)
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore nella modifica' })
    }
};

export const deleteOne = async (req, res) => {
    const id = req.params.id
    try {
        await Author.findByIdAndDelete(id)
        res.send({ message: 'eliminato correttamente' })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore nella modifica' })
    }
};

export const patchAvatar = async (req, res) => {
    const id = req.params.authorId

    try {
        const author = await Author.findByIdAndUpdate(id, { avatar: req.file.path })
        await author.save()
        res.status(200).send(author)
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ message: 'errore patch avatar' })
    }
};

/* export const sendMailMiddleware = async (req, res) => {
    await transport.sendMail(
        {
            from: 'noreply@epicoders.com', 
            to: req.body.email, 
            subject: 'Benvenuto', 
            text: `Benvenuto ${req.body.fullName}`, 
            html: `<b>Benvenuto ${req.body.fullName}</b>`, 
        }
    )
    return res.send({ success: true })
}; */