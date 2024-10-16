import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
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
        type: Number
    },
    description: {
        type: String
    },
    image:{
        type:String,
        default:null
    }
})

const userModel = mongoose.model('user', userSchema)
export default userModel;