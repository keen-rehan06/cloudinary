import express from "express"
import upload from "../config/multer.config.js"
import { allFile, uploadFile } from "../controller/upload.controller.js"

const router = express.Router()

router.post("/upload",upload.single("file"),uploadFile)
router.get("/find",allFile)

export default router;