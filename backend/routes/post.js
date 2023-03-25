import {Router} from "express";
import { createPost, getPosts } from "../controllers/post.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";

const router = Router();

router.post("/create", getAccessToRoute, createPost);
router.get("/", getPosts);

export default router;