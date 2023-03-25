import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/error/errorHandler.js";
import { databaseConnection } from "./utils/database/databaseConnection.js";

dotenv.config({path: "./config/config.env"});
const app = express();

databaseConnection();
app.use(cors({credentials:true, origin:true}));
app.use(express.static("/public"));
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Server is up at ${process.env.PORT}`));