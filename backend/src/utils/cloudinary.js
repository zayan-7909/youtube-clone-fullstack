import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Configure directly inside the function so process.env is guaranteed to exist
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File uploaded successfully, delete temp copy
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadCloudinary, uploadCloudinary as uploadOnCloudinary };