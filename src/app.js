import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("public"));
app.get("/test",(req,res)=>{
    res.send("Yassu Di Balle Balle");
})

export {app};