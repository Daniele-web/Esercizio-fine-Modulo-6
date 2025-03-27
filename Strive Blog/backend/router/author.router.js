import express from 'express';
import uploadLocal from '../middlewares/uploadLocal.js';
import * as authorsControllers from '../controllers/authors.contrellers.js'
import { uploadCloudinaryAvatar } from '../middlewares/uploadCloudinary.js';


const authorRouter = express.Router();

authorRouter.get("/", authorsControllers.readMultiple)

authorRouter.get("/:id", authorsControllers.readOne)

authorRouter.post("/", uploadCloudinaryAvatar.single('avatar'), authorsControllers.createOne)

//authorRouter.post("/", uploadLocal.single('avatar'), authorsControllers.createOne)
authorRouter.put("/:id", authorsControllers.editOne)

authorRouter.delete("/:id", authorsControllers.deleteOne)

authorRouter.patch('/:authorId/avatar/', uploadCloudinaryAvatar.single('avatar'), authorsControllers.patchAvatar )


export default authorRouter;