import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required:true,
    },
    description: {
        type: String
    },
    image:{
        type:String,
        default:null
    },
    otp:{
        type:Number
    }
})

const userModel = mongoose.model('User', userSchema)
export default userModel;