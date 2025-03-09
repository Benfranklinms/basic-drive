import express from "express";
import userRouter from "./routes/user.routes.js";
const dotenv = require("dotenv");

dotenv.config();
const app = express();


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});