import express from "express";
import { addData, viewData } from "../controller/portController.js";  

const router = express.Router();

router.post("/add", addData);

router.get("/view", viewData);

export default router;
