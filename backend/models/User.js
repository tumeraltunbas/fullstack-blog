import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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


UserSchema.pre("save", function(next){
    if(this.isModified("pasword")) {

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(this.password, salt);
        this.password=hash;
        
        next();
    }
    next();
})

export const User = mongoose.model("User", UserSchema);