import mongoose from "mongoose";
let students = mongoose.model("students",mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        required:true
    },
    profile_pic:{
        type:String
    }
}));
export {students};



