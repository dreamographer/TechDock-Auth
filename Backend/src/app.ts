import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoute";

function createServer(){
    const app = express();
    app.use(express.json());
    app.use("/api/users", userRouter);
    return app
}

export default createServer;
