import {  students } from "../models/students.model.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";


let uploadFile = multer({
    storage : multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"uploads/");
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+path.extname(file.originalname));
        }
    }),
    fileFilter : (req,file,cb) =>{
        if(file.mimetype.startsWith("image")){
            cb(null,true);
        }else{
            cb(new Error("file type not supported"),false);
        }
    },
    limits : {
        fileSize:10*1024*1024 
    }
});

let getAllStudents = async (req,res) => {
    try{
        let student = await students.find();
        
        
        if(student.length===0){
            
            res.status(404).json("no record availble");
        }else{
            for (let i = 0; i < student.length; i++) {
                if(!student[i].profile_pic){
                    continue;
                }
                let temp = student[i].profile_pic;
                student[i].profile_pic=req.protocol+"://"+req.header("host")+"/uploads/"+temp;
                
            }
            res.status(200).json(student);
        }
    }catch(error){
        res.status(500).json("Something went wrong with the server");
        console.log(error.message);
    }
};

let getOneStudent = async (req,res) => {
    try {
        
        
        let student = await students.findOne({_id : req.params.id});
        if(!student){
            res.status(404).json("record not found");

        }else{
            if(!student.profile_pic){
                res.status(200).json(student);
            }else{
                let temp = student.profile_pic;
                student.profile_pic=req.protocol+"://"+req.header("host")+"/uploads/"+temp;
                res.status(200).json(student);
            }
        }
    } catch (error) {
        res.status(500).json("Something went wrong with the server");
        console.log(error.message);
    }
};

let createStudent = async (req,res)=>{
    try {
        if(!req.file){
            await students.insertOne(req.body);
            res.status(201).json("Record added");
        }else{
            await students.insertOne({...req.body, profile_pic : req.file.filename});
            res.status(201).json("Record added");
        }
    } catch (error) {
        res.status(500).json("Something went wrong with the server");
        console.log(error.message);
    }
    
};




export {getAllStudents,getOneStudent,createStudent,uploadFile};
