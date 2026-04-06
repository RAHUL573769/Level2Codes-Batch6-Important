import { v2 as cloudinary } from "cloudinary"
import config from "./index.js"

cloudinary.config({

    cloud_name: config.CLOUDINARY_API_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
})

export const deleteFromCloudinary = async (url: string) => {
    try {
        // Extract public_id from URL
        const regex = /\/v\d+\/(.+)\.\w+$/;
        const match = url.match(regex);

        if (!match || !match[1]) {
            throw new Error("Invalid Cloudinary URL");
        }

        const publicId = match[1];

        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image"
        });

        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw error;
    }
};

export const cloudinaryUploadExport = { cloudinary }