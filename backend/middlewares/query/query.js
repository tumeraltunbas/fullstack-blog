import { User } from "../../models/User.js";
import CustomError from "../../utils/error/CustomError.js";

export const isUserExists = async(req, res, next) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({
            email:email,
            isActive:true
        })
        .select("_id email");

        if(!user){
            return next(new CustomError(400, "There is no user with that email"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}