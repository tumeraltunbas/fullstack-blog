import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "Username can not be null"],
        unique:true
    },
    email: {
        type: String,
        required:[true, "Email can not be null"],
        unique:true
    },
    password: {
        type: String,
        required:[true, "Password can not be null"],
        select: false
    },
    resetPassword:{
        token: String,
        expires: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default:true
    },
});

UserSchema.methods.createJwt = function(){
    
    const {JWT_SECRET_KEY, JWT_EXPIRES} = process.env;

    const payload = {
        id: this.id,
        username: this.username,
        email: this.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES});
    
    return token;
}


UserSchema.pre("save", function(next){
    if(this.isModified("password")) {

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(this.password, salt);
        this.password=hash;
        
        next();
    }
    next();
})

export const User = mongoose.model("User", UserSchema);