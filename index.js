import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import portRouter from "./router/portRouter.js";  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();  

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    console.log("CONNECTED TO MONGODB");
    
} catch (error) {
    console.log(error);
}

app.use("/v1/container", portRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
