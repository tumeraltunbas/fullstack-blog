import {Router} from "express";
import { createPost, getPosts, getPostById, editPost } from "../controllers/post.js";
import { getAccessToRoute, getPostOwnerAccess } from "../middlewares/auth/auth.js";
import {upload} from "../utils/helpers/fileUpload.js";
const router = Router();

router.post("/create", [getAccessToRoute, upload.single("file")], createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", [getAccessToRoute, getPostOwnerAccess], editPost);

export default router;