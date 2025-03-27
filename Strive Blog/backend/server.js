import express from 'express';
import 'dotenv/config';
import mongoose, { mongo } from 'mongoose';

import authorRouter from './router/author.router.js';
import blogPostRouter from './router/blogPost.router.js';
import authRouter from './router/auth.router.js';

import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'

import googleStrategy from './config/passport.config.js';

import passport from 'passport';



const port = process.env.PORT || 4000

const server = express();

passport.use('google', googleStrategy)

//upload immagini con multer cors morgan helmet
server.use(morgan('dev'))
server.use(helmet())
server.use(cors())

server.use('/uploads', express.static('./uploads'))

server.use(express.json());

server.use('/authors', authorRouter)
server.use('/blogPosts', blogPostRouter)

server.use('/', authRouter);

await mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then(() => console.log('database connesso'))
    .catch((err) => console.log(err));

server.listen(port, () => {
    console.log(`server avviato su ${process.env.HOST}:${port}`);
})