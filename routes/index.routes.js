import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { supabase } from '../config/supabase.js';
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/home", authMiddleware, (req, res) => {
    res.render("home");
});

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    const fileBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    try {
        const { data, error } = await supabase
            .storage
            .from('basic-drive')
            .upload(fileName, fileBuffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            throw error;
        }

        res.send({ message: "File uploaded successfully!", data });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file");
    }
});

export default router;