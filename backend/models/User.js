import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "Username can not be null"],
        unique:true
    },
    email: {
        type: String,
        required:[true, "Email can not be null"],
        unique:true
    },
    password: {
        type: String,
        required:[true, "Password can not be null"],
        select: false
    },
    resetPassword:{
        token: String,
        expires: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default:true
    },
});

export const User = mongoose.model("User", UserSchema);