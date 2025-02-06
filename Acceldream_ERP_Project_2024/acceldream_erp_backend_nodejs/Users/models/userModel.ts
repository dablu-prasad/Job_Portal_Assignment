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
    },
    mobile: {
        type: Number,
        required:true,
    },
    user_designation: {
        type: String
    },
    approval_manager: {
        type: String
    },
    image:{
        type:String,
        default:null
    },
    company_dealer_name:{
        type:String,
        default:null
    },
    branch:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    },
    city:{
        type:String,
        default:null
    },
    pin:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:null
    },
    module:{
        type:String,
        default:null
    },
    otp:{
        type:Number
    },
    user_credencial_status:{
        type:String,
        default:"pending"
    },
    status:{
        type:Boolean,
        default:true
    }
})
const userModel = mongoose.model('User', userSchema)
export default userModel;
