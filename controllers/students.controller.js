import {  students } from "../models/students.model.js";
import multer from "multer";
import path from "path";
import fs from "fs";



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
            await students.insertOne({...req.body, profile_pic : ""});
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

let deleteStudent = async (req,res) => {
    try {
        let student = await students.findOne({_id:req.params.id});
        if(!student){
            res.status(400).json("cannot find record");
        }else{
            let address = student.profile_pic;
            await students.deleteOne({_id : req.params.id});
            if(address){
                let fpath = path.join("uploads",address);
                fs.unlink(fpath,(error)=>{
                    if(error){
                        console.log("Error occuered while unlinking the file : " + error.message);
                        
                    }
                });
            }
            res.status(200).json("Deletion Done");
        }
        
    } catch (error) {
        res.status(500).json("Something went wrong with the server");
        console.log(error.message);
    }
};

let updateStudent = async (req,res) => {
    try {
        let student = await students.findOne({_id:req.params.id});
        let address = student.profile_pic;
        if(!student){
            fs.unlink(path.join("uploads",req.file.filename),(error)=>{
                if(error){
                    console.log("unable to delete file " + error.message );
                    
                }
            })
            res.status(400).json("cannot find record");
        }else{
             if(req.file){
                await students.updateOne({_id:req.params.id},
                    {$set:{
                        name:req.body.name,
                        email:req.body.email,
                        phone:req.body.phone,
                        gender:req.body.gender,
                        profile_pic:req.file.filename
                    }}
                );
                if(address){
                     fs.unlink(path.join("uploads",address),(error)=>{
                            if(error){
                                console.log("unable to delete file " + error.message );
                    
                            }
                        })
                }

             }else{
                 await students.updateOne({_id:req.params.id},
                    {$set:{
                        name:req.body.name,
                        email:req.body.email,
                        phone:req.body.phone,
                        gender:req.body.gender
                       
                    }}
                );
             }
             res.status(200).json("Updation Done");
        }
    }catch(error){
        res.status(500).json("Something went wrong with the server");
        console.log(error.message);
    }
}




export {getAllStudents,getOneStudent,createStudent,uploadFile,deleteStudent,updateStudent};
