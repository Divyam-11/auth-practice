import mongoose, {Schema} from "mongoose";
const todoSchema = mongoose.Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true

    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
    },
    deadline:{
        type:Date,
        required:true
    }
},{
    timestamps:true
});

export const Todo = mongoose.model("Todo",todoSchema);