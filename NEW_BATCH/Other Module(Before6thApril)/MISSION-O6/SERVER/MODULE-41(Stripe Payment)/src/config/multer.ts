import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUploadExport } from "./cloudinary.js";
import { Request, Response } from 'express';
import multer from "multer";


const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUploadExport.cloudinary,
    params: async (req: Request, file) => {
        const originalName = file.originalname;

        const extension =
            originalName.split(".").pop()?.toLowerCase() || "file";

        const fileNameWithoutExtension = originalName
            .split(".")
            .slice(0, -1)
            .join(".")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

        const uniqueName =
            Math.random().toString().substring(2) + "-" + Date.now();

        const folder = extension === "pdf" ? "pdfs" : "images";

        return {
            folder: `ph-healthcare/${folder}`,
            public_id: `${fileNameWithoutExtension}-${uniqueName}`,
            resource_type: "auto",
        };
    },
});

export const multerUpload = multer({ storage })