import express from "express";
import userRouter from "./routes/user.routes.js";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.routes.js";


dotenv.config();
connectToDB();

const app = express();


app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});