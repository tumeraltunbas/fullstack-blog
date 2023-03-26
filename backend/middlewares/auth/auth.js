import jwt from "jsonwebtoken";
import { Post } from "../../models/Post.js";
import CustomError from "../../utils/error/CustomError.js";


export const getAccessToRoute = (req, res, next) => {
    
    const {token} = req.cookies;
    const {JWT_SECRET_KEY} = process.env;
    
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return next(err);
        }

        req.user = decoded;
        next()
    })
}

export const getPostOwnerAccess = async(req, res, next) => {
    try{
        const {id} = req.params;

        const post = await Post.findOne({
            _id:id,
            isVisible:true       
        })
        .select("_id user");

        if(!post){
            return next(new CustomError(400, "There is no post with that id"));
        }

        if(post.user != req.user.id){
            return next(new CustomError(403, "You can not access this route because you are not owner of this post"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}