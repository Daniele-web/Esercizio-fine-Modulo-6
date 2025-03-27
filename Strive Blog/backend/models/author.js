import { Schema, model } from "mongoose";

const authorSchema = new Schema({
    nome: String,
    cognome: String,
    email: {
        type: String,
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: {
        type: String,
        // required: true,
        select: false 
    },
    data: Date,
    avatar: String,
    googleId: String
}, {
    collection: 'authors'
})

const Author = model('Author', authorSchema)

export default Author;