import { Post } from "../models/Post.js";

export const createPost = async(req, res, next) => {
    try{

        const {title, summary, content} = req.body;
        
        const fileName = String(req.user.id + "_" + req.file.originalname);

        await Post.create({
            title:title,
            summary:summary,
            image:fileName,
            content:content,
            user:req.user.id
        });

        return res
        .status(200)
        .json({success:true});

    }
    catch(err){
        return next(err);
    }
}

export const getPosts = async(req, res, next) => {
    try{

        const posts = await Post.find({
            isVisible:true
        })
        .limit(5)
        .sort("-createdAt")
        .populate({path: "user", select:"username"});

        return res
        .status(200)
        .json({success:true, posts:posts});
        
    }
    catch(err){
        return next(err);
    }
}