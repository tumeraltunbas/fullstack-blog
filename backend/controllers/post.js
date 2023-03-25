import { Post } from "../models/Post.js";

export const createPost = async(req, res, next) => {
    try{

        //to be refactored
        const {title, summary, image, content} = req.body;
        
        await Post.create({
            title:title,
            summary:summary,
            image:image,
            content:content
        });

        return res
        .status(200)
        .json({success:true});

    }
    catch(err){
        return next(err);
    }
}