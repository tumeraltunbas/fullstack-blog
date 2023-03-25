import { User } from "../models/User.js";
import CustomError from "../utils/error/CustomError.js";
import { checkEmail, checkPassword } from "../utils/helpers/inputHelpers.js";
import { sendJwtToCookie } from "../utils/helpers/jwtHelpers.js";
import bcrypt from "bcryptjs";


export const register = async(req, res, next) => {
    try{
        const {username, email, password} = req.body;

        if(!checkEmail(email)){
            return next(new CustomError(400, "Please proive a valid email"));
        }

        if(!checkPassword(password)){
            return next(new CustomError(400, "Your password must contains: Minimum eight characters, at least one letter and one number."));
        }

        const user = await User.create({
            username:username,
            email:email,
            password:password
        });

        sendJwtToCookie(user, res);
        
    }
    catch(err){
        return next(err);
    }
}


export const login = async(req, res, next) => {
    
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return next(new CustomError(400, "You have to provide an email and password"));
        }

        const user = await User.findOne({
            email:email
        })
        .select("_id email +password");

        if(!bcrypt.compareSync(password, user.password)){

            return next(new CustomError(400, "Check your credentials"));
        }

        sendJwtToCookie(user, res);

    }
    catch(err){
        return next(err);
    }
}

export const getUser = async(req, res, next) => {
    return res
    .status(200)
    .json({success:true, user:req.user});
}