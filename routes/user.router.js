import express from "express";
import {ApiResponse} from "../utils/ApiResponse.js"
const router = express.Router();
router.post("/register",(req,res)=>{
    res.json(new ApiResponse(200,{data:"dummy data"},"Hello World"));
})

export default router;
