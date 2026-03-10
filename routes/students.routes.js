import express from "express";
import { getAllStudents } from "../controllers/students.controller.js";


let router = express.Router();


router.get("/" , getAllStudents);

export default router;