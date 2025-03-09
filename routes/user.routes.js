import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";



router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", body("email").trim().isEmail(),
body("password").trim().isLength({min: 5}),
body("username").trim().isLength({min: 3}),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array(), message: "Invalid data"});
    };
    const {email, username, password} = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        email,
        username,
        password: hashPass
    });

    res.json(newUser);
});

export default router;