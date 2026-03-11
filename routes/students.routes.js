import express from "express";
import { getAllStudents,getOneStudent } from "../controllers/students.controller.js";


let router = express.Router();


router.get("/" , getAllStudents);
router.get("/:id", getOneStudent);

export default router;