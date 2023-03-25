import { User } from "../models/User.js";
import CustomError from "../utils/error/CustomError.js";
import { checkEmail, checkPassword } from "../utils/helpers/inputHelpers.js";
import { sendJwtToCookie } from "../utils/helpers/jwtHelpers.js";
import bcrypt, { hash } from "bcryptjs";
import {generate} from "randomstring";
import { mailHelper } from "../utils/helpers/mailHelpers.js";


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

export const logout = async(req, res, next) => {
    
    return res
    .status(200)
    .cookie("token", undefined, {maxAge:Date.now()})
    .json({success:true});
}

export const changePassword = async(req, res, next) => {
    try{

        const {oldPassword, newPassword, passwordRepeat} = req.body; 

        const user = await User.findOne({
            _id:req.user.id
        })
        .select("_id +password");

        if(bcrypt.compareSync(oldPassword, user.password)){
            return next(new CustomError(400, "Your old password is not correct"));
        }

        if(newPassword != passwordRepeat){
            return next(new CustomError(400, "Your password does not match"));
        }
        
        if(!checkPassword(newPassword)){
            return next(new CustomError(400, "Your password must contains: Minimum eight characters, at least one letter and one number."));
        }

        user.password = newPassword;
        await user.save();

        return res
        .status(200)
        .json({success:true, message:"Your password has been changed"});

    }
    catch(err){
        return next(err);
    }
}

export const forgotPassword = async(req, res, next) => {
    try{

        const {email} = req.params;
        const [DOMAIN, SMTP_USER, RESET_PASSWORD_TOKEN_EXPIRES] = process.env;

        const user = await User.findOne({
            email:email
        });

        const string = generate(20);

        const salt = bcrypt.genSaltSync();
        const hashedString = bcrypt.hashSync(string, salt);

        user.resetPassword.token = hashedString;
        user.resetPassword.expires = new Date(Date.now() + Number(RESET_PASSWORD_TOKEN_EXPIRES));

        await user.save();

        const resetPasswordLink = `${DOMAIN}/api/auth/resetPassword?ResetPasswordToken=${hashedString}`;
        
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject: "About reset password",
            html: `<a href='${resetPasswordLink}'>Link</a>`
        };

        mailHelper(mailOptions);

        return res
        .status(200)
        .json({success:true, message: "Reset password link sent"});

    }
    catch(err){
        return next(err);
    }
}

export const resetPassword = async(req, res, next) => {
    try{
       const {resetPasswordToken} = req.params;

       const {password, passwordRepeat} = req.body; 
       

        if(password != passwordRepeat) {
            return next(new CustomError(400, "Your password does not match"));
        }

       const user = await User.findOne({
        "resetPassword.token": resetPasswordToken,
        "resetPassword.expires" : {$gt : Date.now()}
       });

       if(!user){
         return next(new CustomError(400, "Your reset password token wrong or expired"));
       }


       user.password = password;
       await user.save();

       return res
       .status(200)
       .json({success:true, message:""})

    }
    catch(err){
        return next(err);
    }
}