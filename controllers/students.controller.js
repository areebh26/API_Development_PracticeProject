import {  students } from "../models/students.model.js";



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


export {getAllStudents};
