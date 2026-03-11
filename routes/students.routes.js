import express from "express";
import { getAllStudents,getOneStudent,createStudent,uploadFile,deleteStudent,updateStudent } from "../controllers/students.controller.js";


let router = express.Router();


router.get("/" , getAllStudents);
router.get("/:id", getOneStudent);
router.post("/",uploadFile.single("image_upload"),createStudent);
router.delete("/:id" , deleteStudent);
router.put("/:id",uploadFile.single("image_upload"),updateStudent);

export default router;