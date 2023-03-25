import { Router } from "express";
import { register, login, getUser } from "../controllers/auth.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";
import { isUserExists } from "../middlewares/query/query.js";


const router = Router();

router.post("/register", register);
router.post("/login", isUserExists, login);
router.get("/getUser", getAccessToRoute, getUser);

export default router;