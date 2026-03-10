import {  students } from "../models/students.model.js";



let getAllStudents = async (req,res) => {
    try{
        let students = await students.find();
        if(!students){
            res.status(404).json("no record availble");
        }else{
            res.status(200).json(students);
        }
    }catch(error){
        res.status(500).json("Something went wrong with the server");
        console.log(error.message);
    }
};


export {getAllStudents};
