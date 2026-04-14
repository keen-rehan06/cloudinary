import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

export const uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });
    fs.unlinkSync(filePath);
    console.log(result.secure_url)
    return res
      .status(200)
      .send({
        message: "Upload SuccessFully on Cloudinary!",
        url: result.secure_url,
      });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlinkSync(filePath);
    }
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};
