import mongoose from "mongoose";

const ApplicationsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        },
        applicationDeadline: {
            type: Date,
        },
        jobDescription: {
            type: String,
        },
        jobNote: {
            type: String,
        },
        jobApplied: {
            type: Boolean,
            default: false
        },
        interviewCall: {
            type: String,
            enum: ['None','Accepted','Skipped','Rejected'],
            required: true,
            default: 'None'
        },
        assessment: {
            type: String,
            enum: ['None','Accepted','Skipped','Rejected'],
            required: true,
            default: 'None'
        },
        interviewFinal: {
            type: String,
            enum: ['None','Accepted','Skipped','Rejected'],
            required: true,
            default: 'None'
        },
        jobOffer: {
            type: String,
            enum: ['None','Offer Received','Offer Declined'],
            required: true,
            default: 'None'
        }
    },
    {timestamps: true}
);

const Application = mongoose.model("Application", ApplicationsSchema);
export default Application;
