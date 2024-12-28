import {asyncHandler} from "../utils/asyncHandler.js";
import {Todo} from "../models/todo.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import mongoose from "mongoose";


const getTodo = asyncHandler(async (req,res)=>{
    try {
        console.log(req.user._id);
        const allTodos = await Todo.find({owner:req.user._id});
        return res.json(new ApiResponse(201,allTodos,"Todos fetched Successfully"));
    }
    catch (e) {
        throw new ApiError(400,"Something went wrong in fetching todos from the server",e);


    }

})
const addTodo = asyncHandler(async (req,res)=>{
    const {user,description,deadline} = req.body;
    const deadlineDate = new Date(deadline);
    console.log(deadlineDate);
    const createTodo = await Todo.create({
        owner: new mongoose.Types.ObjectId(req.user._id),
        description,
        isCompleted : false,
        deadline:deadlineDate,
    })
    if(!createTodo){
        throw new ApiError(400,"Something went wrong in creating todo");
    }
    return res.json(new ApiResponse(201,createTodo,"Success"));
})
const deleteTodo = asyncHandler(async (req,res)=>{
// get id fetch delete
    const {_id} = req.body;
    const deletedTodo = await Todo.findByIdAndDelete(new mongoose.Types.ObjectId(_id));
    if(!deletedTodo){
        new ApiError(200,"Something went wrong while deleting the todo");
    }
    return res.json(new ApiResponse(201,deletedTodo,"Successfully delete the todo"))
})
const updateTodo = asyncHandler(async(req,res)=>{
    const {_id,user,description,deadline,isCompleted} = req.body;
})
export {getTodo,addTodo,deleteTodo,updateTodo}