import mongoose from "mongoose";

export const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => console.log("database connection sucessfull")).catch(err => console.log(err));
}

