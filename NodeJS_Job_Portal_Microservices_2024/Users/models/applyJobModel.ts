import mongoose from "mongoose";

const applyJobSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    jobId: {
        type: String,
        required: true,
    },
})

const applyJobModel = mongoose.model('applyjob', applyJobSchema)
export default applyJobModel;