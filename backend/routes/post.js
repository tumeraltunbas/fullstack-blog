import {Router} from "express";
import { createPost, getPosts } from "../controllers/post.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";
import {upload} from "../utils/helpers/fileUpload.js";
const router = Router();

router.post("/create", [getAccessToRoute, upload.single("file")], createPost);
router.get("/", getPosts);

export default router;