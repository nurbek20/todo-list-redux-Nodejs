import {model, Schema,Types} from "mongoose"

const UserSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type:Types.ObjectId,
        ref:"Todo"
    }],
    created:{
        type:Date,
        default:Date.now()
    }
})
export default model("User", UserSchema)