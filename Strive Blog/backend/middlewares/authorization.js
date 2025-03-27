import jwt from 'jsonwebtoken';
import Author from '../models/author.js';

export default (req, res, next) => {
   
    if (!req.headers.authorization) return res.status(401).send();

    const parts = req.headers.authorization.split(' ');

    if (parts.length != 2) return res.status(401).send();
    
    if (parts[0] != 'Bearer') return res.status(401).send();

    const jwtToken = parts[1];

    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.status(401).send();
        const author = await Author.findById(payload.authorId);

        if (!author) return res.status(401).send();
        req.loggedAuthor = author;
        console.log(author);

        next();
    });
};