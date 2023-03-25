import { Router } from "express";
import { register, getUser } from "../controllers/auth.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";


const router = Router();

router.post("/register", register);
router.post("/getUser", getAccessToRoute, getUser);

export default router;