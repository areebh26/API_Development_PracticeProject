import  express  from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/students.database.js';
import  router  from './routes/students.routes.js';
import multer from 'multer';
let app = express();
dotenv.config();
connectDB();



app.use(express.json());
app.use("/api/students" ,router);
app.use("/uploads",express.static("uploads"));
app.use(express.urlencoded({extended:false}));
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(`Multer Error: ${err.message}`);
  } else if (err) {
    return res.status(500).send(`Something went wrong: ${err.message}`);
  }
  next();
});
app.listen(process.env.PORT, () => {
    console.log('Server stared on port 3000!');
});



