import mongoose from "mongoose";

const DocumentsSchema = new mongoose.Schema(
    {
        applicationId: {
            type: String,
            required: true
        },
        documentTitle: {
            type: String,
            required: true,
            min: 2,
            max: 100
        },
        documentFilePath: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

const Document = mongoose.model("Document", DocumentsSchema);
export default Document;
