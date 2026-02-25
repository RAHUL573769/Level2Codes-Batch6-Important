import multer from "multer"
import path from "path"
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';
// import { ICloudinaryResponse, IFile } from "../app/interfaces/file";
import config from "../config";
import { ICloudinaryResponse, IFile } from "../app/interface";


cloudinary.config({
    cloud_name: config.CLOUDIARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
    console.log("28", file)
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinaryResponse) => {
                fs.unlinkSync(file.path)
                if (error) {
                    reject(error)
                    console.log("Error")
                }
                else {
                    resolve(result)
                }
            })
    })
};

export const fileUploader = {
    upload,
    uploadToCloudinary
}