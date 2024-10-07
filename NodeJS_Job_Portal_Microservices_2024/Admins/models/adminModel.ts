import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminName: {
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
        type: Number
    },
    description: {
        type: String
    },
})

const adminModel = mongoose.model('admin', adminSchema)
export default adminModel;