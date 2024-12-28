import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {options} from "../src/constants.js";

const generateAccessAndRefreshTokens = async (userId)=>{

try{
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // important save the newly generated refresh token abck to data bse
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});
    return {accessToken,refreshToken}

}
catch (e){
    throw new ApiError(500,"Something went wrong while generating tokens",e);
}
}
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
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password,username} = req.body;
    if(!email && !username){
        throw new ApiError(400,"Either username or email is needed for login");

    }
    const user = await User.findOne({
        $or:[{username},{email}]
    })
    if(!user) {
        throw new ApiError(500,"Failed to fetch user from server");
    }
    const isPasswordCorrect =await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid Credentials");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{
        user:loggedUser,accessToken,refreshToken
    },"User Logged In Successfully"))

})
const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{
            refreshToken : 1
        }

    },    {
        new: true
    })
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(
        new ApiResponse(200,{},"User logged out")
    )
})
export {registerUser,loginUser,logoutUser};