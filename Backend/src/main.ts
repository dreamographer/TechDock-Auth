import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectToDatabase } from "./database/connection";
import userRouter from "./routes/userRoute";

try {
  const app = express(); 
  app.use(express.json());
  //Connect to the Db
  connectToDatabase().then(res => {
    app.use("/api", userRouter);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log("Error on the Server", error);
}
