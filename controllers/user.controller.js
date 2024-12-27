import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    // username , email , password
    const {username,email , password} = req.body;
    if(!username && !email && !password){
        throw new ApiError(400,"All fields are required");
    }
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    });
    if(existedUser){
        throw new ApiError(400,"User already exists");
    }
    const user = await User.create({username,email,password});
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user");
    }
    return res.json(new ApiResponse(200,createdUser,"User Registered Successfully"))
})
export {registerUser}