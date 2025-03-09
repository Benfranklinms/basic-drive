import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';


router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", body("email").trim().isEmail(),
body("password").trim().isLength({min: 5}),
body("username").trim().isLength({min: 3}),
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array(), message: "Invalid data"});
    };
    res.send(errors);
});

export default router;