import express from "express";
const router = express.Router();
import multer from "multer";


const upload = multer({storage: multer.memoryStorage()});

router.get("/home", (req, res) => {
    res.render("home");
});

router.post("/upload", upload.single("file"), async (req, res) => {
    res.send(req.file);
})






export default router;