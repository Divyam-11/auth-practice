import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "../routes/user.router.js"
const app = express();
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(cors({
    credentials:true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api/v1/users",userRouter);
app.get("/test",(req,res)=>{
    res.send("test");
})

export {app};