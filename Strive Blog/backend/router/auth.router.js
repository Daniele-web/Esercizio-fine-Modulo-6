import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import authorization from '../middlewares/authorization.js';
import passport from 'passport';


const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authorization, authController.logout);
authRouter.get('/me', authorization, authController.me);

authRouter.get('/login-google', passport.authenticate('google', {scope:['profile','email']}))
authRouter.get('/callback-google',passport.authenticate('google', {session: false}), authController.callbackGoogle)


export default authRouter;