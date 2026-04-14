import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import uploadModel from "../models/upload.model.js";

export const uploadFile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        message: "name and file is required!",
      });
    }

    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    fs.unlinkSync(filePath);

    const newFile = await uploadModel.create({
      name,
      url: result.secure_url,
    });

    return res.status(200).json({
      message: "Upload Successfully on Cloudinary!",
      image: newFile,
    });

  } catch (error) {

    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    console.log("ERROR:", error.message);

    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};

export const allFile = async(req,res) => {
  try {
    const file = await uploadModel.find({})
    return res.status(200).send(file)
  } catch (error) {
    return res.status(500).send({err:error.message})
  }
}