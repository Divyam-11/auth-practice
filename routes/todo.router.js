import express from "express";
import {ApiResponse} from "../utils/ApiResponse.js";
import {addTodo, deleteTodo, getTodo} from "../controllers/todo.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(verifyJWT);
router.route("/test").get(getTodo).post(addTodo).delete(deleteTodo);


export default router;