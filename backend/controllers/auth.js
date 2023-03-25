import { User } from "../models/User.js";
import CustomError from "../utils/error/CustomError.js";
import { checkEmail, checkPassword } from "../utils/helpers/inputHelpers.js";
import { sendJwtToCookie } from "../utils/helpers/jwtHelpers.js";

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