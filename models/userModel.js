import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required: [true,"Password is Required"]
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true});
userSchema.pre("Save", function (next){
if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = function (password){
    bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = function (){
    return
}

const User = mongoose.model("User",userSchema);
export {User};