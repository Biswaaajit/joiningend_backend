import express from "express";
import mongoose from "mongoose";
import userRouter from "./Router/userRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log("MongoDB URI:", MONGO_URI ? "Loaded" : "Not Found");

const app = express();
app.use(cors());
app.use(express.json());

const userRoute = express.Router();
app.use("/user", userRoute);

userRouter(userRoute);

app.listen(5100, () => console.log("Server is running on 5100 port"));
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("open", () => console.log("Connection is successful"));
db.on("error", () => console.log("Error in connection"));
