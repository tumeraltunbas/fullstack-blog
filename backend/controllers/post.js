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

export const getPostById = async(req, res, next) => {
    try{

        const {id} = req.params;

        const post = await Post.findOne({
            _id:id,
            isVisible:true
        });

        return res
        .status(200)
        .json({success:true, post:post});

    }
    catch(err){
        return next(err);
    }
}

export const editPost = async(req, res, next) => {
    try{

        const post = req.body;
        const {id} = req.params;
        
        let obj = {
            ...post
        } 

        if(req.file){
            const fileName = String(req.user.id + "_" + req.file.originalname);
            obj = {
                ...post, fileName
            }
        }

        await Post.findOneAndUpdate(
            {_id:req.user.id},
            
            {
                ...obj    
            }
        );

        return res
        .status(200)
        .json({success:true, message:"Post has been updated"});
        
    }
    catch(err){
        return next(err);
    }
}