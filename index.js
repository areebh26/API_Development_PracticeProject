import  express  from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/students.database.js';
import  router  from './routes/students.routes.js';
let app = express();
dotenv.config();
connectDB();



app.use(express.json());
app.use("/api/students" ,router);
app.use("/uploads",express.static("uploads"));
app.use(express.urlencoded({extended:true}));
app.listen(process.env.PORT, () => {
    console.log('Server stared on port 3000!');
});



