import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true,
        unique:true
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobExperience: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    adminId:{
        type:String,                    //mongoose.Types.ObjectId,
        required:true
    }
})

const jobModel = mongoose.model('jobdetail', jobSchema)
export default jobModel;