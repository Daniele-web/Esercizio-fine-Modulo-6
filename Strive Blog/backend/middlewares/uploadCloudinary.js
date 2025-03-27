import multer from "multer";
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const uploadCloudinaryAvatar = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'avatar', 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    })
})

export const uploadCloudinaryCover = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'cover', 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    })
})