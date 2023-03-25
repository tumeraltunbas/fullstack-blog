import { Post } from "../models/Post.js";

export const createPost = async(req, res, next) => {
    try{

        //to be refactored
        const {title, summary, image, content} = req.body;
        
        await Post.create({
            title:title,
            summary:summary,
            image:image,
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