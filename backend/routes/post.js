import {Router} from "express";
import { createPost, getPosts, getPostById } from "../controllers/post.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";
import {upload} from "../utils/helpers/fileUpload.js";
const router = Router();

router.post("/create", [getAccessToRoute, upload.single("file")], createPost);
router.get("/", getPosts);
router.get("/:id", getAccessToRoute, getPostById);
export default router;