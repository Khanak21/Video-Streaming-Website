import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/User.js';
import videoRoutes from './routes/Video.js';
import commentRoutes from './routes/Comment.js';
import authRoutes from './routes/auth.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const connect =()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        throw err;
    })
}
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/auth",authRoutes)
app.use((err,req,res,next)=>{
    const status = err.status||500;
    const message = err.message||"errorrrr";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})
app.listen(3000,()=>{
    connect()
    console.log("connected");
})