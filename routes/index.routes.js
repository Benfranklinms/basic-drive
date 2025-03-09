import express from "express";
const router = express.Router();
import multer from "multer";
import { supabase } from '../config/supabase.js';

const upload = multer({ storage: multer.memoryStorage() });

router.get("/home", (req, res) => {
    res.render("home");
});

router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;

    try {
        const { data, error } = await supabase
            .storage
            .from('basic-drive') // Replace with your bucket name
            .upload(fileName, fileBuffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            throw error;
        }

        res.send({ message: "File uploaded successfully!", data });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file.");
    }
});

export default router;