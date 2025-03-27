import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Author from '../models/author.js';
import 'dotenv/config';


export const login = async (req, res) => {
    try {
        console.log("prima della ricerca nel database")

        const author = await Author.findOne({ email: req.body.email }).select('+password');


        if (!author) {
            console.log("Autore non trovato");
            return res.status(401).send('Credenziali sbagliate');
        }

        console.log("Autore trovato:", author._id);

        const isPasswordCorrect = await bcrypt.compare(req.body.password, author.password);
        if (!isPasswordCorrect) {
            console.log("Password errata");
            return res.status(401).send('Credenziali sbagliate');
        }

        console.log("prima del jwt")

        const token = jwt.sign(
            { authorId: author.id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        console.log("Token generato:", token);

        res.status(200).json({ token });

        
    } catch (error) {
        res.status(500).json({ error: 'Login non avvenuto' });
    }
};

export const logout = (req, res) => { };

export const me = (req, res) => {
    return res.send(req.loggedAuthor);
};


export const callbackGoogle = async (req, res) => {
    console.log(req)
    res.redirect(`http://localhost:3000?token=${req.user.jwtToken}`)
}