import express from "express";
import { getAllStudents,getOneStudent,createStudent,uploadFile } from "../controllers/students.controller.js";


let router = express.Router();


router.get("/" , getAllStudents);
router.get("/:id", getOneStudent);
router.post("/",uploadFile.single("image_upload"),createStudent);

export default router;