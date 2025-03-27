import Author from "../models/author.js";

import GoogleStrategy from 'passport-google-oauth20'
// import { callbackGoogle } from '../controllers/authentication.controller'
import jwt from 'jsonwebtoken'
import "dotenv/config";

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackUrl:`${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
    callbackURL: process.env.GOOGLE_CALLBACK
  },

async function(accessToken, refreshToken, profile, passportNext) {

  console.log(profile)
    
    const {given_name: name, family_name: surname ,email, sub: googleId, picture: avatar}= profile._json
    let author = await Author.findOne({ googleId })
    
    if (!author){
      const newAuthor = new Author({
        googleId,
        name,
        surname,
        email,
        avatar,
      })
      author = await newAuthor.save()
    }

    jwt.sign(
      {authorId: author.id},
      process.env.JWT_SECRET,
      {
          expiresIn: '1h'
      },
      (err, jwtToken) =>{
          if (err) return res.status(500).send();

          
          return passportNext(null ,{jwtToken})
      }
    )
  }
)

export default googleStrategy;