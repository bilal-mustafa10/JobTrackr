import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        emailAddress: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        verifiedEmail: {
            type: Boolean,
            default: false,
        },
        universityName: {
            type: String,
            required: true,
        },
        universityYear: {
            type: Number,
            required: true,
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", UsersSchema);
export default User;
