import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
let connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URL);
};
export {connectDB};