// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from 'multer-storage-cloudinary';


// import multer from "multer";
// import { Request } from "express";

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req: Request, file: Express.Multer.File) => {

//         const originalName = file.originalname;

//         const extension = originalName
//             .split(".")
//             .pop()
//             ?.toLowerCase();

//         const fileNameWithoutExtension = originalName
//             .replace(/\.[^/.]+$/, "")
//             .toLowerCase()
//             .replace(/\s+/g, "-")
//             .replace(/[^a-z0-9-]/g, "");

//         const uniqueName =
//             Math.random().toString(36).substring(2) +
//             "-" +
//             Date.now() +
//             "-" +
//             fileNameWithoutExtension;

//         const folder = extension === "pdf" ? "pdfs" : "others";

//         return {
//             folder: `uploads/${folder}`,
//             public_id: uniqueName,
//             resource_type: "auto", // ✅ important fix
//         }; import { CloudinaryStorage } from 'multer-storage-cloudinary';
//         import { CloudinaryStorage } from 'multer-storage-cloudinary';

//     },
// });

// export const multerUpload = multer({ storage });