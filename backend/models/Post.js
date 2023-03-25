import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, "Title can not be null"]
    },
    summary: {
        type:String,
        required:[true, "Summary can not be null"]
    },
    image: {
        type:String,
        required:[true, "Image can not be null"]
    },
    content: {
        type:String,
        required:[true, "Content can not be null"]
    },
    lastEdited: {
        type:Date,
        default:null
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:[true, "User can not be null"],
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
    isVisible: {
        type: Boolean,
        default: true
    }
});

export const Post = mongoose.model("Post", PostSchema);