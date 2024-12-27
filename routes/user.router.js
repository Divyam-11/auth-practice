import express from "express";
import {ApiResponse} from "../utils/ApiResponse.js"
import {registerUser} from "../controllers/user.controller.js";
const router = express.Router();
router.post("/register",registerUser)

export default router;
